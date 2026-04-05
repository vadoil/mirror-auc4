import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import forumBanner from "@/assets/forum-women-banner.png";

const OrganizersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-background">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <img
          src={forumBanner}
          alt="Форум для женщин «Отражение» — осень '26"
          className="w-full h-auto block"
        />
      </motion.div>
    </section>
  );
};

export default OrganizersSection;