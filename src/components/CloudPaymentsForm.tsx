import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CloudPaymentsFormProps {
  ticketRequestId: string;
  name: string;
  email: string;
  ticketType: string;
  amount: number;
}

// Publishable key - safe to keep in the client
const PUBLIC_ID = "pk_09a9b638bf69b1119a886896a3091";
const WIDGET_SRC = "https://widget.cloudpayments.ru/bundles/cloudpayments.js";

declare global {
  interface Window {
    cp?: any;
  }
}

const loadWidget = () =>
  new Promise<void>((resolve, reject) => {
    if (window.cp?.CloudPayments) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("widget load error")));
      return;
    }
    const s = document.createElement("script");
    s.src = WIDGET_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("widget load error"));
    document.head.appendChild(s);
  });

const CloudPaymentsForm = ({ ticketRequestId, name, email, ticketType, amount }: CloudPaymentsFormProps) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      await loadWidget();
      const widget = new window.cp.CloudPayments({ language: "ru-RU" });
      const origin = window.location.origin;

      // Modern API (widget.start) is preferred; older widgets only expose widget.pay.
      if (typeof widget.start === "function") {
        await widget.start({
          publicTerminalId: PUBLIC_ID,
          amount,
          currency: "RUB",
          culture: "ru-RU",
          paymentSchema: "Single",
          description: `Пожертвование · «Отражение добра» · ${ticketType}`,
          externalId: ticketRequestId,
          receiptEmail: email,
          userInfo: {
            fullName: name,
            email,
          },
          metadata: {
            ticket_request_id: ticketRequestId,
            ticket_type: ticketType,
            name,
          },
          successRedirectUrl: `${origin}/?payment=success`,
          failRedirectUrl: `${origin}/?payment=fail`,
          retryPayment: true,
        });
        // Виджет закрыт; финальный статус приходит через webhook.
        toast.info("Форма оплаты закрыта. Если платёж прошёл, подтверждение придёт на почту.");
      } else {
        widget.pay(
          "charge",
          {
            publicId: PUBLIC_ID,
            description: `Пожертвование · «Отражение добра» · ${ticketType}`,
            amount,
            currency: "RUB",
            accountId: email,
            invoiceId: ticketRequestId,
            email,
            skin: "mini",
            data: {
              ticket_request_id: ticketRequestId,
              ticket_type: ticketType,
              name,
            },
          },
          {
            onSuccess: () => {
              toast.success("Спасибо! Пожертвование принято. Подтверждение придёт на почту.");
            },
            onFail: () => {
              toast.error("Платёж не прошёл. Попробуйте ещё раз.");
            },
            onComplete: () => setLoading(false),
          },
        );
      }
    } catch (e) {
      console.error(e);
      toast.error("Платёж не прошёл. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-5">
      <div className="bg-cream/5 border border-cream/10 p-5 space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-cream/50 text-[10px] uppercase tracking-[0.2em] font-body">Назначение</span>
          <span className="text-cream text-sm font-body text-right">{ticketType}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-cream/50 text-[10px] uppercase tracking-[0.2em] font-body">Сумма</span>
          <span className="text-cream text-xl font-display">{amount.toLocaleString("ru-RU")} ₽</span>
        </div>
        {name && (
          <div className="flex justify-between items-baseline">
            <span className="text-cream/50 text-[10px] uppercase tracking-[0.2em] font-body">Имя</span>
            <span className="text-cream/80 text-sm font-body">{name}</span>
          </div>
        )}
        <div className="flex justify-between items-baseline">
          <span className="text-cream/50 text-[10px] uppercase tracking-[0.2em] font-body">Email</span>
          <span className="text-cream/80 text-sm font-body break-all">{email}</span>
        </div>
      </div>

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.2em] font-body font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Открываем оплату...
          </>
        ) : (
          "Поддержать фонд"
        )}
      </button>

      <p className="text-cream/40 text-[11px] font-body leading-relaxed text-center">
        Оплата проходит в защищённой форме CloudPayments. Данные карты не сохраняются на сайте, подтверждение придёт на email.
      </p>
    </div>
  );
};

export default CloudPaymentsForm;
