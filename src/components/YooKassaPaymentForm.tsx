import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface YooKassaPaymentFormProps {
  ticketRequestId: string;
  name: string;
  email: string;
  ticketType: string;
  amount: number;
}

const YooKassaPaymentForm = ({ ticketRequestId, name, email, ticketType, amount }: YooKassaPaymentFormProps) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const returnUrl = `${window.location.origin}/?payment=success`;
      const description = `Регистрация на «Отражение добра» · ${ticketType}`;
      const { data, error } = await supabase.functions.invoke("create-yookassa-payment", {
        body: {
          ticketRequestId,
          amount,
          description,
          email,
          returnUrl,
        },
      });
      if (error || !data?.confirmationUrl) {
        console.error("YooKassa create error:", error, data);
        toast.error("Не удалось создать платёж. Попробуйте ещё раз.");
        setLoading(false);
        return;
      }
      window.location.href = data.confirmationUrl as string;
    } catch (e) {
      console.error(e);
      toast.error("Ошибка соединения. Попробуйте позже.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-cream/5 border border-cream/10 p-5 space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-cream/50 text-[10px] uppercase tracking-[0.2em] font-body">Тариф</span>
          <span className="text-cream text-sm font-body">{ticketType}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-cream/50 text-[10px] uppercase tracking-[0.2em] font-body">К оплате</span>
          <span className="text-cream text-xl font-display">
            {amount.toLocaleString("ru-RU")} ₽
          </span>
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
            Открываем ЮKassa...
          </>
        ) : (
          "Оплатить через ЮKassa"
        )}
      </button>

      <p className="text-cream/40 text-[11px] font-body leading-relaxed text-center">
        Вы будете перенаправлены на защищённую страницу ЮKassa. После оплаты автоматически вернётесь на сайт, и мы пришлём подтверждение на email.
      </p>
    </div>
  );
};

export default YooKassaPaymentForm;
