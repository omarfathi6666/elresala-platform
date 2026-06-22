import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Logo from "@/components/shared/Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <Logo />

            <p className="mt-6 leading-8 text-slate-400">
              منصة الرسالة التعليمية هي المنصة الرسمية لمستر عمر فتحي
              لتدريس الأحياء للصف الثالث الثانوي والعلوم المتكاملة
              للصف الأول الثانوي.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">
              روابط سريعة
            </h3>

            <ul className="space-y-4 text-slate-400">
              <li>
                <Link href="/">الرئيسية</Link>
              </li>

              <li>
                <Link href="#subjects">المواد</Link>
              </li>

              <li>
                <Link href="#faq">الأسئلة الشائعة</Link>
              </li>

              <li>
                <Link href="/login">تسجيل الدخول</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">
              تواصل معنا
            </h3>

            <div className="space-y-4 text-slate-400">
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>01000000000</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>info@elresala.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">
              تابعنا
            </h3>

            <div className="flex gap-4">
              <Link
                href="#"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-blue-600"
              >
                <Facebook size={20} />
              </Link>

              <Link
                href="#"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-pink-600"
              >
                <Instagram size={20} />
              </Link>

              <Link
                href="#"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-red-600"
              >
                <Youtube size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} منصة الرسالة التعليمية - جميع الحقوق محفوظة.
        </div>
      </Container>
    </footer>
      );
}