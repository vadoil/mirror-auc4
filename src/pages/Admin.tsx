import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Save, Eye, Upload, X, Download, Check, KeyRound, Mail, Copy } from "lucide-react";
import * as XLSX from "xlsx";

type Lot = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  starting_price: number;
  current_price: number;
  bid_step: number;
  category: string | null;
  status: string;
  start_at: string | null;
  end_at: string | null;
  delivery_terms: string | null;
  restrictions: string | null;
  sort_order: number;
};

type Bid = {
  id: string;
  lot_id: string;
  user_id: string | null;
  bidder_name: string;
  bidder_email: string;
  amount: number;
  created_at: string;
};

type TicketRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  ticket_type: string;
  message: string | null;
  status: string;
  created_at: string;
  promo_code: string | null;
};

type UtmVisit = {
  id: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  landing_page: string | null;
  referrer: string | null;
  created_at: string;
};

const statusLabels: Record<string, string> = {
  draft: "Черновик",
  active: "Активен",
  ended: "Завершён",
  paid: "Оплачен",
  archived: "Архив",
};

const getImageUrl = (url: string | null) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  const { data } = supabase.storage.from("lot-images").getPublicUrl(url);
  return data.publicUrl;
};

const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"lots" | "bids" | "requests" | "utm">("lots");
  const [lots, setLots] = useState<Lot[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [requests, setRequests] = useState<TicketRequest[]>([]);
  const [utmVisits, setUtmVisits] = useState<UtmVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLot, setEditingLot] = useState<Partial<Lot> | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { checkAuth(); }, []);
  useEffect(() => {
    if (tab === "lots") fetchLots();
    if (tab === "bids") fetchBids();
    if (tab === "requests") fetchRequests();
    if (tab === "utm") fetchUtmVisits();
  }, [tab]);

  const fetchUtmVisits = async () => {
    const { data } = await supabase.from("utm_visits").select("*").order("created_at", { ascending: false }).limit(10000);
    if (data) setUtmVisits(data as UtmVisit[]);
  };

  const fetchRequests = async () => {
    const { data } = await supabase.from("ticket_requests").select("*").order("created_at", { ascending: false });
    if (data) setRequests(data as TicketRequest[]);
  };

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin/login"); return; }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin");
    if (!roles || roles.length === 0) {
      toast.error("Нет прав администратора");
      await supabase.auth.signOut();
      navigate("/admin/login");
      return;
    }
    setLoading(false);
    fetchLots();
  };

  const fetchLots = async () => {
    const { data } = await supabase.from("lots").select("*").order("sort_order");
    if (data) setLots(data as Lot[]);
  };

  const fetchBids = async () => {
    const { data } = await supabase.from("bids").select("*").order("created_at", { ascending: false });
    if (data) setBids(data as Bid[]);
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("lot-images").upload(path, file);
    setUploading(false);
    if (error) { toast.error("Ошибка загрузки фото"); return; }
    setEditingLot((prev) => prev ? { ...prev, image_url: path } : prev);
    toast.success("Фото загружено");
  };

  const canActivate = (lot: Partial<Lot>) => {
    return !!(lot.title && lot.end_at && lot.starting_price && lot.bid_step && lot.image_url);
  };

  const saveLot = async () => {
    if (!editingLot?.title) { toast.error("Укажите название лота"); return; }
    if (editingLot.status === "active" && !canActivate(editingLot)) {
      toast.error("Нельзя активировать без title, end_at, starting_price, bid_step и фото");
      return;
    }

    const payload = {
      title: editingLot.title,
      description: editingLot.description || null,
      image_url: editingLot.image_url || null,
      starting_price: editingLot.starting_price || 0,
      current_price: editingLot.current_price || 0,
      bid_step: editingLot.bid_step || 1000,
      category: editingLot.category || null,
      status: (editingLot.status || "draft") as "draft" | "active" | "ended" | "paid" | "archived",
      start_at: editingLot.start_at || null,
      end_at: editingLot.end_at || null,
      delivery_terms: editingLot.delivery_terms || null,
      restrictions: editingLot.restrictions || null,
      sort_order: editingLot.sort_order || 0,
    };

    if (editingLot.id) {
      const { error } = await supabase.from("lots").update(payload).eq("id", editingLot.id);
      if (error) { toast.error("Ошибка сохранения"); return; }
      toast.success("Лот обновлён");
    } else {
      const { error } = await supabase.from("lots").insert(payload);
      if (error) { toast.error("Ошибка создания"); return; }
      toast.success("Лот создан");
    }
    setEditingLot(null);
    fetchLots();
  };

  const deleteLot = async (id: string) => {
    if (!confirm("Удалить лот?")) return;
    const { error } = await supabase.from("lots").delete().eq("id", id);
    if (error) { toast.error("Ошибка удаления"); return; }
    toast.success("Лот удалён");
    fetchLots();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const exportRequestsToExcel = () => {
    if (requests.length === 0) {
      toast.error("Нет заявок для экспорта");
      return;
    }
    const rows = requests.map((r) => ({
      "Дата": new Date(r.created_at).toLocaleString("ru-RU"),
      "Имя": r.name,
      "Email": r.email,
      "Телефон": r.phone || "",
      "Тип билета": r.ticket_type,
      "Промокод": r.promo_code || "",
      "Сообщение": r.message || "",
      "Статус": r.status === "paid" ? "Оплачено" : (r.promo_code ? "По промокоду" : "Новая"),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [{ wch: 18 }, { wch: 22 }, { wch: 28 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 40 }, { wch: 14 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Заявки");
    const date = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `zayavki-${date}.xlsx`);
    toast.success("Файл сохранён");
  };

  const togglePaid = async (req: TicketRequest) => {
    const newStatus = req.status === "paid" ? "new" : "paid";
    const { error } = await supabase.from("ticket_requests").update({ status: newStatus }).eq("id", req.id);
    if (error) { toast.error("Ошибка обновления"); return; }
    setRequests((prev) => prev.map((r) => r.id === req.id ? { ...r, status: newStatus } : r));
    toast.success(newStatus === "paid" ? "Отмечено как оплачено" : "Снята отметка об оплате");
  };

  const provisionAccount = async (req: TicketRequest, force = false) => {
    const confirmMsg = force
      ? `Сбросить пароль для ${req.email} и отправить новое письмо?`
      : `Создать аккаунт для ${req.email} и отправить письмо с доступом?`;
    if (!window.confirm(confirmMsg)) return;
    const t = toast.loading("Отправляем...");
    const { data, error } = await supabase.functions.invoke("provision-account", {
      body: { email: req.email, name: req.name, force },
    });
    toast.dismiss(t);
    if (error) { toast.error("Ошибка: " + error.message); return; }
    const action = (data as any)?.action;
    if (action === "created") toast.success("Аккаунт создан, письмо отправлено");
    else if (action === "password_reset") toast.success("Пароль сброшен, письмо отправлено");
    else if (action === "skipped") {
      if (window.confirm(`Аккаунт для ${req.email} уже существует. Сбросить пароль и отправить новое письмо?`)) {
        provisionAccount(req, true);
      }
    } else toast.success("Готово");
  };

  const buildConfirmationEmail = (req: TicketRequest) => {
    const subject = "Подтверждение регистрации — Аукцион «Отражение добра»";
    const tierLabels: Record<string, string> = {
      friend: "Друг (по промокоду)",
      participant: "Участник аукциона",
      patron: "Меценат",
      partner: "Партнёр",
    };
    const tier = tierLabels[req.ticket_type] || req.ticket_type;
    const body = `Здравствуйте, ${req.name}!

Спасибо за регистрацию на благотворительный аукцион «Отражение добра».

Ваш статус: ${tier}${req.promo_code ? `\nПромокод: ${req.promo_code}` : ""}

📅 Дата: 24 апреля 2026
📍 Место: Москва, Мясницкая 24/7, баланс-холл «Место быть»
🕖 Сбор гостей: 19:00

Аукционист вечера — Александр Цыпкин.

Все средства от продажи лотов направляются на поддержку благотворительных проектов наших партнёров.

Подробности и список лотов: https://xn--80aodvkjc9f.xn--p1ai

При любых вопросах напишите в ответ на это письмо.

С уважением,
Команда «Отражение добра»`;
    return { subject, body };
  };

  const sendManualEmail = (req: TicketRequest) => {
    const { subject, body } = buildConfirmationEmail(req);
    const url = `mailto:${encodeURIComponent(req.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const copyEmailText = async (req: TicketRequest) => {
    const { subject, body } = buildConfirmationEmail(req);
    const text = `Кому: ${req.email}\nТема: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Текст письма скопирован");
    } catch {
      toast.error("Не удалось скопировать");
    }
  };
    return (
      <div className="min-h-screen bg-warm-black flex items-center justify-center">
        <p className="text-cream/40 font-body">Загрузка...</p>
      </div>
    );
  }

  const tabs = [
    { key: "lots" as const, label: "Лоты" },
    { key: "bids" as const, label: "Ставки" },
    { key: "requests" as const, label: "Заявки" },
    { key: "utm" as const, label: "UTM" },
  ];

  return (
    <div className="min-h-screen bg-warm-black text-cream">
      <div className="border-b border-cream/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="font-display text-xl uppercase tracking-[0.15em]">Админ · Аукцион</h1>
          <div className="flex gap-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-body transition-colors ${
                  tab === t.key ? "bg-primary text-primary-foreground" : "text-cream/40 hover:text-cream"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-cream/40 hover:text-cream transition-colors"><Eye size={18} /></a>
          <button onClick={handleLogout} className="text-cream/40 hover:text-cream transition-colors"><LogOut size={18} /></button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {tab === "lots" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl uppercase">Управление лотами</h2>
              <button
                onClick={() => setEditingLot({ title: "", starting_price: 0, current_price: 0, bid_step: 1000, status: "draft", sort_order: lots.length })}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs uppercase tracking-[0.2em] font-body"
              >
                <Plus size={14} /> Новый лот
              </button>
            </div>

            {editingLot && (
              <div className="bg-cream/5 border border-cream/10 p-6 mb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Название лота *" value={editingLot.title || ""} onChange={(e) => setEditingLot({ ...editingLot, title: e.target.value })} className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary" />
                  <input placeholder="Категория" value={editingLot.category || ""} onChange={(e) => setEditingLot({ ...editingLot, category: e.target.value })} className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary" />
                  <input type="number" placeholder="Стартовая цена *" value={editingLot.starting_price || ""} onChange={(e) => setEditingLot({ ...editingLot, starting_price: Number(e.target.value) })} className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary" />
                  <input type="number" placeholder="Шаг ставки *" value={editingLot.bid_step || ""} onChange={(e) => setEditingLot({ ...editingLot, bid_step: Number(e.target.value) })} className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary" />
                  <input type="datetime-local" placeholder="Начало торгов" value={editingLot.start_at?.slice(0, 16) || ""} onChange={(e) => setEditingLot({ ...editingLot, start_at: e.target.value ? new Date(e.target.value).toISOString() : null })} className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary" />
                  <input type="datetime-local" placeholder="Окончание торгов *" value={editingLot.end_at?.slice(0, 16) || ""} onChange={(e) => setEditingLot({ ...editingLot, end_at: e.target.value ? new Date(e.target.value).toISOString() : null })} className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary" />
                </div>
                <textarea placeholder="Описание" value={editingLot.description || ""} onChange={(e) => setEditingLot({ ...editingLot, description: e.target.value })} className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary resize-none h-20" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea placeholder="Условия получения" value={editingLot.delivery_terms || ""} onChange={(e) => setEditingLot({ ...editingLot, delivery_terms: e.target.value })} className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary resize-none h-16" />
                  <textarea placeholder="Ограничения" value={editingLot.restrictions || ""} onChange={(e) => setEditingLot({ ...editingLot, restrictions: e.target.value })} className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary resize-none h-16" />
                </div>

                {/* Image upload */}
                <div className="flex items-center gap-4">
                  {editingLot.image_url && (
                    <div className="relative w-20 h-20 border border-cream/10 overflow-hidden">
                      <img src={getImageUrl(editingLot.image_url) || ""} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => setEditingLot({ ...editingLot, image_url: null })} className="absolute top-0 right-0 bg-destructive text-destructive-foreground p-0.5">
                        <X size={12} />
                      </button>
                    </div>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) uploadImage(e.target.files[0]); }} />
                  <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 border border-cream/10 text-cream/60 px-4 py-2 text-xs uppercase tracking-[0.2em] font-body hover:text-cream hover:border-cream/30 transition-colors disabled:opacity-50">
                    <Upload size={14} /> {uploading ? "Загрузка..." : "Загрузить фото"}
                  </button>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <select
                    value={editingLot.status || "draft"}
                    onChange={(e) => setEditingLot({ ...editingLot, status: e.target.value })}
                    className="bg-cream/5 border border-cream/10 text-cream px-4 py-2 text-sm font-body focus:outline-none focus:border-primary"
                  >
                    <option value="draft">Черновик</option>
                    <option value="active">Активен</option>
                    <option value="ended">Завершён</option>
                    <option value="paid">Оплачен</option>
                    <option value="archived">Архив</option>
                  </select>
                  <div className="flex-1" />
                  <button onClick={() => setEditingLot(null)} className="text-cream/40 text-xs uppercase tracking-[0.2em] font-body hover:text-cream">Отмена</button>
                  <button onClick={saveLot} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs uppercase tracking-[0.2em] font-body"><Save size={14} /> Сохранить</button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {lots.map((lot) => (
                <div key={lot.id} className="bg-cream/5 border border-cream/10 p-4 flex items-center gap-4">
                  {lot.image_url && (
                    <img src={getImageUrl(lot.image_url) || ""} alt="" className="w-12 h-12 object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-cream truncate">{lot.title}</p>
                    <p className="text-cream/40 text-xs font-body">{lot.category || "–"} · {lot.starting_price.toLocaleString()} ₽ · шаг {lot.bid_step.toLocaleString()} ₽</p>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-body px-2 py-1 ${
                    lot.status === "active" ? "bg-green-500/20 text-green-400" :
                    lot.status === "ended" ? "bg-yellow-500/20 text-yellow-400" :
                    lot.status === "draft" ? "bg-cream/10 text-cream/30" :
                    "bg-cream/10 text-cream/30"
                  }`}>
                    {statusLabels[lot.status] || lot.status}
                  </span>
                  <button onClick={() => setEditingLot(lot)} className="text-cream/40 hover:text-cream text-xs font-body">Ред.</button>
                  <button onClick={() => deleteLot(lot.id)} className="text-cream/40 hover:text-destructive"><Trash2 size={14} /></button>
                </div>
              ))}
              {lots.length === 0 && <p className="text-cream/30 text-sm font-body text-center py-8">Нет лотов</p>}
            </div>
          </div>
        )}

        {tab === "bids" && (
          <div>
            <h2 className="font-display text-2xl uppercase mb-6">Все ставки</h2>
            <div className="space-y-2">
              {bids.map((bid) => {
                const lotTitle = lots.find(l => l.id === bid.lot_id)?.title || bid.lot_id.slice(0, 8);
                return (
                  <div key={bid.id} className="bg-cream/5 border border-cream/10 p-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-cream">{bid.bidder_name}</p>
                      <p className="text-cream/40 text-xs font-body">{bid.bidder_email} · Лот: {lotTitle}</p>
                    </div>
                    <p className="font-numbers text-lg text-cream">{bid.amount.toLocaleString()} ₽</p>
                    <p className="text-cream/30 text-xs font-body whitespace-nowrap">{new Date(bid.created_at).toLocaleDateString("ru")}</p>
                  </div>
                );
              })}
              {bids.length === 0 && <p className="text-cream/30 text-sm font-body text-center py-8">Нет ставок</p>}
            </div>
          </div>
        )}

        {tab === "requests" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl uppercase">Заявки</h2>
              <button
                onClick={exportRequestsToExcel}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs uppercase tracking-[0.2em] font-body hover:opacity-90 transition-opacity"
              >
                <Download size={14} /> Экспорт в Excel
              </button>
            </div>
            <div className="space-y-2">
              {requests.map((req) => {
                const isPaid = req.status === "paid";
                return (
                  <div key={req.id} className="bg-cream/5 border border-cream/10 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <p className="font-body text-sm text-cream font-medium">{req.name}</p>
                          <span className="text-[10px] uppercase tracking-wider font-body px-2 py-0.5 bg-primary/20 text-primary">{req.ticket_type}</span>
                          {req.promo_code && (
                            <span className="text-[10px] uppercase tracking-wider font-body px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-400/30">
                              🎟 Промокод: {req.promo_code}
                            </span>
                          )}
                          <span className={`text-[10px] uppercase tracking-wider font-body px-2 py-0.5 ${isPaid ? "bg-green-500/20 text-green-400" : req.promo_code ? "bg-purple-500/20 text-purple-300" : "bg-yellow-500/20 text-yellow-400"}`}>
                            {isPaid ? "Оплачено" : req.promo_code ? "По промокоду" : "Не оплачено"}
                          </span>
                        </div>
                        <p className="text-cream/40 text-xs font-body">{req.email}{req.phone ? ` · ${req.phone}` : ''}</p>
                        {req.message && <p className="text-cream/60 text-xs font-body mt-2 whitespace-pre-line">{req.message}</p>}
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <p className="text-cream/30 text-xs font-body whitespace-nowrap">{new Date(req.created_at).toLocaleDateString("ru")}</p>
                        <button
                          onClick={() => togglePaid(req)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-body transition-colors ${
                            isPaid
                              ? "border border-cream/20 text-cream/60 hover:text-cream hover:border-cream/40"
                              : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          }`}
                        >
                          <Check size={12} /> {isPaid ? "Снять оплату" : "Отметить оплачено"}
                        </button>
                        {isPaid && (
                          <button
                            onClick={() => provisionAccount(req)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-body bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
                            title="Создать аккаунт и отправить письмо с логином и паролем"
                          >
                            <KeyRound size={12} /> Доступ в ЛК
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {requests.length === 0 && <p className="text-cream/30 text-sm font-body text-center py-8">Нет заявок</p>}
            </div>
          </div>
        )}

        {tab === "utm" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl uppercase">UTM-заходы</h2>
              <p className="text-cream/40 text-xs font-body">Всего: {utmVisits.length}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-cream/10 text-cream/40 text-[10px] uppercase tracking-[0.15em]">
                    <th className="text-left py-2 pr-4">Дата</th>
                    <th className="text-left py-2 pr-4">Source</th>
                    <th className="text-left py-2 pr-4">Medium</th>
                    <th className="text-left py-2 pr-4">Campaign</th>
                    <th className="text-left py-2 pr-4">Страница</th>
                    <th className="text-left py-2">Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {utmVisits.map((v) => (
                    <tr key={v.id} className="border-b border-cream/5 text-cream/80">
                      <td className="py-2 pr-4 text-cream/40 whitespace-nowrap text-xs">
                        {new Date(v.created_at).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="py-2 pr-4 text-cream">{v.utm_source || "—"}</td>
                      <td className="py-2 pr-4">{v.utm_medium || "—"}</td>
                      <td className="py-2 pr-4">{v.utm_campaign || "—"}</td>
                      <td className="py-2 pr-4 text-cream/60 truncate max-w-[200px]" title={v.landing_page || ""}>{v.landing_page || "—"}</td>
                      <td className="py-2 text-cream/40 truncate max-w-[200px] text-xs" title={v.referrer || ""}>{v.referrer || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {utmVisits.length === 0 && <p className="text-cream/30 text-sm font-body text-center py-8">Заходов с UTM-метками пока нет</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
