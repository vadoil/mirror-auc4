// Расшифровка UTM-меток коротких ссылок otrazis.ru — для уведомлений в Telegram
const LABELS: Record<string, { who: string; link: string }> = {
  lena_golova: { who: 'Лена Голова', link: 'otrazis.ru/lena' },
  voluminous: { who: 'Voluminous', link: 'otrazis.ru/voluminous' },
  organizers: { who: 'организаторы (Саша и Гиза)', link: 'otrazis.ru/otrazis' },
  kakunin: { who: 'Георгий Какунин', link: 'otrazis.ru/kakunin' },
  nenaprasno: { who: 'фонд «Не напрасно»', link: 'otrazis.ru/nenaprasno' },
  mestobyt: { who: '«Место быть»', link: 'otrazis.ru/mestobyt' },
  ads: { who: 'реклама', link: 'otrazis.ru/reklama' },
  muradyan: { who: 'Мурадян', link: 'otrazis.ru/muradyan' },
}

/** «Лена Голова (otrazis.ru/lena)», неизвестная метка — как есть, без метки — «сайт напрямую» */
export const sourceLabel = (source?: string | null) => {
  if (!source || source === 'site') return 'сайт напрямую'
  const l = LABELS[source]
  return l ? `${l.who} (${l.link})` : source
}
