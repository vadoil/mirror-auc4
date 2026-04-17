import { useEffect, useRef } from "react";

interface YooKassaPaymentFormProps {
  name: string;
  email: string;
}

const SHOP_ID = "1324768";
const PRICE = 15000;
const DESCRIPTION = "Регистрация на Благотворительный аукцион · 26 апреля 2026";

const YooKassaPaymentForm = ({ name, email }: YooKassaPaymentFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject YooKassa stylesheet once
    const cssId = "yookassa-simplepay-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://yookassa.ru/integration/simplepay/css/yookassa_construct_form.css?v=1.34.0";
      document.head.appendChild(link);
    }

    // Inject YooKassa script (re-run each mount to bind to new form)
    const script = document.createElement("script");
    script.src = "https://yookassa.ru/integration/simplepay/js/yookassa_construct_form.js?v=1.34.0";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef} className="text-cream">
      <p className="text-cream/60 text-xs font-body mb-4 leading-relaxed">
        {name && <>Спасибо, {name}! </>}
        Заявка сохранена. Завершите регистрацию оплатой через ЮKassa.
      </p>

      <form
        className="yoomoney-payment-form"
        action="https://yookassa.ru/integration/simplepay/payment"
        method="post"
        acceptCharset="utf-8"
      >
        <div className="ym-products">
          <div className="ym-block-title ym-products-title">Товары</div>
          <div className="ym-product">
            <div className="ym-product-line">
              <span className="ym-product-description">{DESCRIPTION}</span>
              <span
                className="ym-product-price"
                data-price={PRICE}
                data-id="529"
                data-count="1"
              >
                15&nbsp;000,00&nbsp;₽
              </span>
            </div>
            <input disabled type="hidden" name="text" value={DESCRIPTION} />
            <input disabled type="hidden" name="price" value={PRICE} />
            <input disabled type="hidden" name="quantity" value="1" />
            <input disabled type="hidden" name="paymentSubjectType" value="commodity" />
            <input disabled type="hidden" name="paymentMethodType" value="full_prepayment" />
            <input disabled type="hidden" name="tax" value="1" />
          </div>
        </div>

        <input type="hidden" name="ym_merchant_receipt" value="" />

        <div className="ym-customer-info">
          <div className="ym-block-title">О покупателе</div>
          <input
            className="ym-input"
            name="email"
            placeholder="Телефон или Email для чека"
            type="text"
            defaultValue={email}
          />
        </div>

        <div className="ym-payment-btn-block ym-before-line ym-align-space-between">
          <div className="ym-input-icon-rub ym-display-none">
            <input
              name="sum"
              placeholder="0.00"
              className="ym-input ym-sum-input ym-required-input"
              type="number"
              step="any"
              defaultValue={PRICE}
            />
          </div>
          <button data-text="Заплатить" className="ym-btn-pay ym-result-price" type="submit">
            <span className="ym-text-crop">Заплатить</span>{" "}
            <span className="ym-price-output">15&nbsp;000,00&nbsp;₽</span>
          </button>
          <img
            src="https://yookassa.ru/integration/simplepay/img/iokassa-gray.svg?v=1.34.0"
            className="ym-logo"
            width={114}
            height={27}
            alt="ЮKassa"
          />
        </div>

        <input name="shopId" type="hidden" value={SHOP_ID} />
      </form>

      <p className="text-cream/40 text-[10px] font-body mt-4 leading-relaxed">
        Если есть промокод — закройте окно и введите его в форме заявки для бесплатной регистрации.
      </p>
    </div>
  );
};

export default YooKassaPaymentForm;
