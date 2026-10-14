// Платёжные реквизиты получателя платежей сайта (одно место — сайт, контакты, оферта)
export const PAYMENT_REQUISITES = {
  name: "Индивидуальный предприниматель Павлова Александра Алексеевна",
  shortName: "ИП Павлова Александра Алексеевна",
  inn: "771672752409",
  account: "40802810220000929132",
  bank: "ООО «Банк Точка»",
  bik: "044525104",
  corrAccount: "30101810745374525104",
};

export const requisiteRows = [
  ["Наименование", PAYMENT_REQUISITES.name],
  ["ИНН", PAYMENT_REQUISITES.inn],
  ["Расчётный счёт", PAYMENT_REQUISITES.account],
  ["Банк", PAYMENT_REQUISITES.bank],
  ["БИК", PAYMENT_REQUISITES.bik],
  ["Корр. счёт", PAYMENT_REQUISITES.corrAccount],
] as const;
