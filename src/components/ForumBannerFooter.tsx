import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const ForumBannerFooter = () => {
  return (
    <section className="py-0 bg-charcoal">
      <div className="max-w-7xl mx-auto flex justify-center border-t border-cream/10">
        <Link
          to="/admin/login"
          className="flex items-center gap-2 py-4 font-body text-sm text-cream/20 hover:text-cream/40 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
          Админ
        </Link>
      </div>
    </section>
  );
};

export default ForumBannerFooter;
