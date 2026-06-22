import { Mail, Phone, MapPin } from "lucide-react";

export default function FooterContact() {
  return (
    <div>
      <h3 className="mb-6 text-lg font-bold text-white">
        تواصل معنا
      </h3>

      <div className="space-y-5">
        <div className="flex items-center gap-3 text-slate-400">
          <Phone size={18} />
          <span>01000000000</span>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <Mail size={18} />
          <span>info@elresala.com</span>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <MapPin size={18} />
          <span>جمهورية مصر العربية</span>
        </div>
      </div>
    </div>
  );
}