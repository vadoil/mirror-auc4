import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Car, Train, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import venueImage from "@/assets/venue.jpg";

const Venue = () => {
  return (
    <div className="min-h-screen bg-warm-black">
      <Header />
      <div className="pt-28 pb-20">
        {/* Hero */}
        <div className="section-padding mb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream uppercase tracking-tight leading-[0.9] mb-4">
                Место <span className="text-primary italic">проведения</span>
              </h1>
              <p className="font-body text-cream/50 text-lg max-w-xl">
                Баланс-холл «Место быть» — первое в России пространство, объединяющее wellbeing-культуру, осознанность и эстетику.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Image */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="section-padding mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="aspect-[21/9] relative overflow-hidden border border-cream/10">
              <img src={venueImage} alt="Место быть — баланс-холл" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-black/40 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Details grid */}
        <div className="section-padding">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-cream/5 border border-cream/10 p-8">
              <MapPin className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-display text-xl text-cream uppercase mb-2">Адрес</h3>
              <p className="font-body text-sm text-cream/60 leading-relaxed">
                г. Москва, ул. Мясницкая, д. 24/7, стр. 1
              </p>
              <a href="https://yandex.ru/maps/-/CDxjF4~B" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary text-xs font-body uppercase tracking-[0.2em] mt-4 hover:opacity-80 transition-opacity">
                На карте <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-cream/5 border border-cream/10 p-8">
              <Train className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-display text-xl text-cream uppercase mb-2">Как добраться</h3>
              <p className="font-body text-sm text-cream/60 leading-relaxed">
                5 минут пешком от м. Чистые пруды / Тургеневская / Сретенский бульвар
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-cream/5 border border-cream/10 p-8">
              <Car className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-display text-xl text-cream uppercase mb-2">Парковка</h3>
              <p className="font-body text-sm text-cream/60 leading-relaxed">
                Городская парковка — мест мало. Рекомендуем приехать на такси или метро.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-cream/5 border border-cream/10 p-8">
              <Calendar className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-display text-xl text-cream uppercase mb-2">Дата</h3>
              <p className="font-body text-sm text-cream/60 leading-relaxed">28 апреля 2026 года</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-cream/5 border border-cream/10 p-8">
              <Clock className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-display text-xl text-cream uppercase mb-2">Время</h3>
              <p className="font-body text-sm text-cream/60 leading-relaxed">
                Сбор гостей: 18:30<br />
                Начало аукциона: 19:00<br />
                Завершение: 23:00
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-cream/5 border border-cream/10 p-8">
              <ExternalLink className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-display text-xl text-cream uppercase mb-2">О площадке</h3>
              <p className="font-body text-sm text-cream/60 leading-relaxed mb-4">
                «Место быть» — баланс-холл нового формата, сочетающий wellbeing и атмосферу для событий.
              </p>
              <a href="https://mestobe.ru/" target="_blank" rel="noopener noreferrer" className="text-primary text-xs font-body uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
                mestobe.ru
              </a>
            </motion.div>
          </div>
        </div>

        {/* Map */}
        <div className="section-padding mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="aspect-[21/9] relative overflow-hidden border border-cream/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.2!2d37.6367!3d55.7625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5c2e774e77%3A0x3c0e3d7c5a4e8b2a!2z0YPQuy4g0JzRj9GB0L3QuNGG0LrQsNGPLCAyNC83!5e0!3m2!1sru!2sru!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Место быть"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Venue;
