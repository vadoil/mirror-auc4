import lotDinner from "@/assets/lot-dinner-sitnikov.jpg";
import lotBiohacking from "@/assets/lot-biohacking-one.jpg";
import lotWatch from "@/assets/lot-watch-ballet.jpg";
import lotHockey from "@/assets/lot-hockey-belov.jpg";
import lotBallet from "@/assets/lot-ballet-lopatkina.jpg";
import lotEmelianenko from "@/assets/lot-emelianenko.jpg";
import lotSmartlife from "@/assets/lot-smartlife.png";
import lotBurunov from "@/assets/lot-burunov-tea.jpg";
import lotShnurov from "@/assets/lot-shnurov.jpg";
import lotListovets from "@/assets/lot-listovets.jpg";
import lotTsypkin from "@/assets/lot-tsypkin.png";
import lotHakamada from "@/assets/lot-hakamada.jpg";
import lotVase from "@/assets/lot-vase.jpg";
import lotBookSitnikov from "@/assets/lot-book-sitnikov.jpg";
import lotSoloviy from "@/assets/lot-soloviy.jpg";

import { supabase } from "@/integrations/supabase/client";

export const localLotAssets: Record<string, string> = {
  "lot-dinner-sitnikov.jpg": lotDinner,
  "lot-biohacking-one.jpg": lotBiohacking,
  "lot-watch-ballet.jpg": lotWatch,
  "lot-hockey-belov.jpg": lotHockey,
  "lot-ballet-lopatkina.jpg": lotBallet,
  "lot-emelianenko.jpg": lotEmelianenko,
  "lot-smartlife.png": lotSmartlife,
  "lot-burunov-tea.jpg": lotBurunov,
  "lot-shnurov.jpg": lotShnurov,
  "lot-listovets.jpg": lotListovets,
  "lot-tsypkin.png": lotTsypkin,
  "lot-hakamada.jpg": lotHakamada,
  "lot-vase.jpg": lotVase,
  "lot-book-sitnikov.jpg": lotBookSitnikov,
  "lot-soloviy.jpg": lotSoloviy,
};

export const fallbackLotImages = [
  lotDinner, lotBiohacking, lotWatch, lotHockey, lotBallet,
  lotEmelianenko, lotSmartlife, lotBurunov, lotShnurov, lotListovets,
];

export const getLotImageUrl = (url: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  const fname = url.split("/").pop() ?? "";
  if (localLotAssets[fname]) return localLotAssets[fname];
  const { data } = supabase.storage.from("lot-images").getPublicUrl(url, {
    transform: { width: 600, height: 450, resize: "cover", quality: 75 },
  });
  return data.publicUrl;
};

// Лоты, требующие уточнения сроков
export const LOTS_TENTATIVE_TIMING = new Set<string>([
  "544d25bf-4e7a-4712-bb68-d122fb47d808", // Часы Балет Чугунова
  "e054a246-3b12-4d8f-adf6-cbb242bca007", // Хакамада
]);
