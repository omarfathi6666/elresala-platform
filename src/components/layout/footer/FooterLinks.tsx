import Link from "next/link";

const links = [
  {
    title: "الرئيسية",
    href: "/",
  },
  {
    title: "المواد",
    href: "#subjects",
  },
  {
    title: "لماذا نحن",
    href: "#why-us",
  },
  {
    title: "الأسئلة الشائعة",
    href: "#faq",
  },
  {
    title: "تسجيل الدخول",
    href: "/login",
  },
];

export default function FooterLinks() {
  return (
    <div>
      <h3 className="mb-6 text-lg font-bold text-white">
        روابط سريعة
      </h3>

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.title}>
            <Link
              href={link.href}
              className="text-slate-400 transition hover:text-white"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
