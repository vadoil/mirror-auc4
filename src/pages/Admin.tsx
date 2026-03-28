import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Save, Eye } from "lucide-react";

type Lot = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  starting_price: number;
  current_price: number;
  category: string | null;
  is_active: boolean;
  sort_order: number;
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

type Bid = {
  id: string;
  lot_id: string;
  bidder_name: string;
  bidder_email: string;
  bidder_phone: string | null;
  amount: number;
  created_at: string;
};

const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"lots" | "requests" | "bids">("lots");
  const [lots, setLots] = useState<Lot[]>([]);
  const [requests, setRequests] = useState<TicketRequest[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLot, setEditingLot] = useState<Partial<Lot> | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (tab === "lots") fetchLots();
    if (tab === "requests") fetchRequests();
    if (tab === "bids") fetchBids();
  }, [tab]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }
    // Check admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin");
    
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
    if (data) setLots(data);
  };

  const fetchRequests = async () => {
    const { data } = await supabase.from("ticket_requests").select("*").order("created_at", { ascending: false });
    if (data) setRequests(data);
  };

  const fetchBids = async () => {
    const { data } = await supabase.from("bids").select("*").order("created_at", { ascending: false });
    if (data) setBids(data);
  };

  const saveLot = async () => {
    if (!editingLot?.title) {
      toast.error("Укажите название лота");
      return;
    }
    if (editingLot.id) {
      const { error } = await supabase.from("lots").update({
        title: editingLot.title,
        description: editingLot.description,
        image_url: editingLot.image_url,
        starting_price: editingLot.starting_price || 0,
        current_price: editingLot.current_price || 0,
        category: editingLot.category,
        is_active: editingLot.is_active ?? true,
        sort_order: editingLot.sort_order || 0,
      }).eq("id", editingLot.id);
      if (error) { toast.error("Ошибка сохранения"); return; }
      toast.success("Лот обновлён");
    } else {
      const { error } = await supabase.from("lots").insert({
        title: editingLot.title,
        description: editingLot.description || null,
        image_url: editingLot.image_url || null,
        starting_price: editingLot.starting_price || 0,
        current_price: editingLot.current_price || 0,
        category: editingLot.category || null,
        is_active: editingLot.is_active ?? true,
        sort_order: editingLot.sort_order || 0,
      });
      if (error) { toast.error("Ошибка создания"); return; }
      toast.success("Лот создан");
    }
    setEditingLot(null);
    fetchLots();
  };

  const deleteLot = async (id: string) => {
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
    { key: "requests" as const, label: "Заявки" },
    { key: "bids" as const, label: "Ставки" },
  ];

  return (
    <div className="min-h-screen bg-warm-black text-cream">
      {/* Header */}
      <div className="border-b border-cream/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="font-display text-xl uppercase tracking-[0.15em]">Админ-панель</h1>
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
          <a href="/" className="text-cream/40 hover:text-cream transition-colors">
            <Eye size={18} />
          </a>
          <button onClick={handleLogout} className="text-cream/40 hover:text-cream transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* LOTS TAB */}
        {tab === "lots" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl uppercase">Управление лотами</h2>
              <button
                onClick={() => setEditingLot({ title: "", starting_price: 0, current_price: 0, is_active: true, sort_order: lots.length })}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs uppercase tracking-[0.2em] font-body"
              >
                <Plus size={14} /> Новый лот
              </button>
            </div>

            {/* Edit form */}
            {editingLot && (
              <div className="bg-cream/5 border border-cream/10 p-6 mb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="Название лота *"
                    value={editingLot.title || ""}
                    onChange={(e) => setEditingLot({ ...editingLot, title: e.target.value })}
                    className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary"
                  />
                  <input
                    placeholder="Категория"
                    value={editingLot.category || ""}
                    onChange={(e) => setEditingLot({ ...editingLot, category: e.target.value })}
                    className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="Стартовая цена"
                    value={editingLot.starting_price || ""}
                    onChange={(e) => setEditingLot({ ...editingLot, starting_price: Number(e.target.value) })}
                    className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="Текущая цена"
                    value={editingLot.current_price || ""}
                    onChange={(e) => setEditingLot({ ...editingLot, current_price: Number(e.target.value) })}
                    className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary"
                  />
                  <input
                    placeholder="URL изображения"
                    value={editingLot.image_url || ""}
                    onChange={(e) => setEditingLot({ ...editingLot, image_url: e.target.value })}
                    className="bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary md:col-span-2"
                  />
                </div>
                <textarea
                  placeholder="Описание"
                  value={editingLot.description || ""}
                  onChange={(e) => setEditingLot({ ...editingLot, description: e.target.value })}
                  className="w-full bg-cream/5 border border-cream/10 text-cream px-4 py-3 text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-primary resize-none h-20"
                />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm font-body text-cream/60">
                    <input
                      type="checkbox"
                      checked={editingLot.is_active ?? true}
                      onChange={(e) => setEditingLot({ ...editingLot, is_active: e.target.checked })}
                      className="accent-primary"
                    />
                    Активен
                  </label>
                  <div className="flex-1" />
                  <button onClick={() => setEditingLot(null)} className="text-cream/40 text-xs uppercase tracking-[0.2em] font-body hover:text-cream">
                    Отмена
                  </button>
                  <button onClick={saveLot} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs uppercase tracking-[0.2em] font-body">
                    <Save size={14} /> Сохранить
                  </button>
                </div>
              </div>
            )}

            {/* Lots list */}
            <div className="space-y-2">
              {lots.map((lot) => (
                <div key={lot.id} className="bg-cream/5 border border-cream/10 p-4 flex items-center gap-4">
                  {lot.image_url && (
                    <img src={lot.image_url} alt="" className="w-12 h-12 object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-cream truncate">{lot.title}</p>
                    <p className="text-cream/40 text-xs font-body">{lot.category || "—"} · {lot.starting_price.toLocaleString()} ₽</p>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-body px-2 py-1 ${lot.is_active ? "bg-green-500/20 text-green-400" : "bg-cream/10 text-cream/30"}`}>
                    {lot.is_active ? "Активен" : "Скрыт"}
                  </span>
                  <button onClick={() => setEditingLot(lot)} className="text-cream/40 hover:text-cream text-xs font-body">
                    Ред.
                  </button>
                  <button onClick={() => deleteLot(lot.id)} className="text-cream/40 hover:text-destructive">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {lots.length === 0 && (
                <p className="text-cream/30 text-sm font-body text-center py-8">Нет лотов</p>
              )}
            </div>
          </div>
        )}

        {/* REQUESTS TAB */}
        {tab === "requests" && (
          <div>
            <h2 className="font-display text-2xl uppercase mb-6">Заявки на билеты</h2>
            <div className="space-y-2">
              {requests.map((req) => (
                <div key={req.id} className="bg-cream/5 border border-cream/10 p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-cream">{req.name}</p>
                    <p className="text-cream/40 text-xs font-body">{req.email} {req.phone && `· ${req.phone}`}</p>
                    {req.message && <p className="text-cream/30 text-xs font-body mt-1">{req.message}</p>}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-body px-2 py-1 bg-primary/20 text-primary">
                    {req.ticket_type}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-body px-2 py-1 ${
                    req.status === "new" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"
                  }`}>
                    {req.status}
                  </span>
                  <p className="text-cream/30 text-xs font-body whitespace-nowrap">
                    {new Date(req.created_at).toLocaleDateString("ru")}
                  </p>
                </div>
              ))}
              {requests.length === 0 && (
                <p className="text-cream/30 text-sm font-body text-center py-8">Нет заявок</p>
              )}
            </div>
          </div>
        )}

        {/* BIDS TAB */}
        {tab === "bids" && (
          <div>
            <h2 className="font-display text-2xl uppercase mb-6">Ставки</h2>
            <div className="space-y-2">
              {bids.map((bid) => (
                <div key={bid.id} className="bg-cream/5 border border-cream/10 p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-cream">{bid.bidder_name}</p>
                    <p className="text-cream/40 text-xs font-body">{bid.bidder_email} {bid.bidder_phone && `· ${bid.bidder_phone}`}</p>
                  </div>
                  <p className="font-numbers text-lg text-cream">{bid.amount.toLocaleString()} ₽</p>
                  <p className="text-cream/30 text-xs font-body whitespace-nowrap">
                    {new Date(bid.created_at).toLocaleDateString("ru")}
                  </p>
                </div>
              ))}
              {bids.length === 0 && (
                <p className="text-cream/30 text-sm font-body text-center py-8">Нет ставок</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
