// Первая UTM-метка посетителя: сохраняется при заходе (UtmTracker) и уходит вместе с регистрацией,
// даже если гостья успела походить по сайту и метка пропала из адреса.
const KEY = "utm_first_touch";
const FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Utm = Partial<Record<(typeof FIELDS)[number], string>>;

export const utmFromSearch = (search: string): Utm =>
  Object.fromEntries(
    FIELDS.map((k) => [k, new URLSearchParams(search).get(k)]).filter(([, v]) => v),
  ) as Utm;

export const rememberUtm = (utm: Utm) => {
  if (!utm.utm_source) return;
  try {
    if (!localStorage.getItem(KEY)) localStorage.setItem(KEY, JSON.stringify(utm));
  } catch {
    /* хранилище недоступно */
  }
};

/** Метка из адреса, иначе — сохранённая первая */
export const currentUtm = (): Utm => {
  const fromUrl = utmFromSearch(window.location.search);
  if (fromUrl.utm_source) return fromUrl;
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") as Utm;
  } catch {
    return {};
  }
};
