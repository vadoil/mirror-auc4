import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Save, Eye, Upload, X } from "lucide-react";

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
  const [tab, setTab] = useState<"lots" | "bids">("lots");
  const [lots, setLots] = useState<Lot[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLot, setEditingLot] = useState<Partial<Lot> | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { checkAuth(); }, []);
  useEffect(() => {
    if (tab === "lots") fetchLots();
    if (tab === "bids") fetchBids();
  }, [tab]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-black flex items-center justify-center">
        <p className="text-cream/40 font-body">Загрузка...</p>
      </div>
    );
  }

  const tabs = [
    { key: "lots" as const, label: "Лоты" },
    { key: "bids" as const, label: "Ставки" },
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
      </div>
    </div>
  );
};

export default Admin;
