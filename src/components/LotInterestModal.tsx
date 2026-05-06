import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Введите имя").max(100),
  phone: z.string().trim().min(5, "Введите телефон").max(30),
  email: z.string().trim().email("Некорректный email").max(120).optional().or(z.literal("")),
  message: z.string().trim().max(500).optional().or(z.literal("")),
});

interface Props {
  lotId?: string | null;
  lotTitle: string;
  trigger?: React.ReactNode;
}

const LotInterestModal = ({ lotId, lotTitle, trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const submit = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Проверьте поля", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("notify-lot-interest", {
        body: { lot_id: lotId ?? null, lot_title: lotTitle, ...parsed.data },
      });
      if (error) throw error;
      toast({ title: "Заявка отправлена", description: "Мы свяжемся с вами в ближайшее время." });
      setOpen(false);
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (e) {
      toast({
        title: "Не удалось отправить",
        description: e instanceof Error ? e.message : "Попробуйте позже",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="btn-primary">Интересует лот</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Интересует лот</DialogTitle>
          <p className="font-body text-sm text-muted-foreground">«{lotTitle}»</p>
        </DialogHeader>
        <div className="space-y-3 mt-2">
          <Input placeholder="Имя *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Телефон *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input placeholder="Email (необязательно)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Textarea
            placeholder="Комментарий (необязательно)"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <Button className="btn-primary w-full" onClick={submit} disabled={loading}>
            {loading ? "Отправляем…" : "Отправить заявку"}
          </Button>
          <p className="text-[10px] text-muted-foreground/60 text-center">
            Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LotInterestModal;
