import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

const socials = [
  {
    icon: Facebook,
    href: "#",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "#",
    label: "Instagram",
  },
  {
    icon: Youtube,
    href: "#",
    label: "YouTube",
  },
];

export default function FooterSocial() {
  return (
    <div>
      <h3 className="mb-6 text-lg font-bold text-white">
        تابعنا
      </h3>

      <div className="flex gap-4">
        {socials.map((social) => {
          const Icon = social.icon;

          return (
            <Link
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-300 transition hover:bg-blue-600 hover:text-white"
            >
              <Icon size={20} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}