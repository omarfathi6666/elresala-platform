export default function FooterBottom() {
  return (
    <div className="mt-16 border-t border-slate-800 pt-8 text-center">
      <p className="text-sm text-slate-500">
        © {new Date().getFullYear()} منصة الرسالة التعليمية - جميع الحقوق
        محفوظة.
      </p>

      <p className="mt-2 text-sm text-slate-600">
        Developed with ❤️ for Mr. Omar Fathy
      </p>
    </div>
  );
}