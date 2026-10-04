// Виджет CloudPayments: общий загрузчик для форм оплаты.

// Публичный ID терминала — его можно хранить на клиенте
export const CLOUDPAYMENTS_PUBLIC_ID = "pk_09a9b638bf69b1119a886896a3091";
const WIDGET_SRC = "https://widget.cloudpayments.ru/bundles/cloudpayments.js";

declare global {
  interface Window {
    cp?: any;
  }
}

export const loadCloudPaymentsWidget = () =>
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
