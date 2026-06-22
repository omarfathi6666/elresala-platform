import type { Metadata } from "next";
import { Cairo } from "next/font/google";

import "./globals.css";
import Providers from "@/providers/Providers";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    default: "Elresala",
    template: "%s | Elresala",
  },
  description:
    "Educational platform for students with courses, exams, assignments and progress tracking.",
  applicationName: "Elresala",
  keywords: [
    "Education",
    "Learning",
    "Platform",
    "Courses",
    "Exams",
    "Students",
    "Elresala",
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cairo.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}