"use client";

import { useEffect, useRef, useState } from "react";
import {
  Users,
  BookOpen,
  FileCheck,
  Trophy,
} from "lucide-react";

const icons = {
  users: Users,
  book: BookOpen,
  exam: FileCheck,
  trophy: Trophy,
} as const;

type StatisticIconKey = keyof typeof icons;

interface StatisticCardProps {
  icon: StatisticIconKey;
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export default function StatisticCard({
  icon,
  target,
  prefix = "",
  suffix = "",
  label,
}: StatisticCardProps) {
  const Icon = icons[icon];
  const [value, setValue] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = cardRef.current;

    if (!element) {
      return;
    }

    let started = false;
    let frameId = 0;

    function animate() {
      const duration = 1200;
      const start = performance.now();

      function step(timestamp: number) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const nextValue = Math.round(target * progress);

        setValue(nextValue);

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        }
      }

      frameId = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (started) {
          return;
        }

        if (entries[0]?.isIntersecting) {
          started = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [target]);

  return (
    <div
      ref={cardRef}
      className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
        <Icon size={30} />
      </div>

      <h3 className="mt-6 text-4xl font-extrabold text-slate-900">
        {prefix}
        {value}
        {suffix}
      </h3>

      <p className="mt-2 text-base font-medium text-slate-600">
        {label}
      </p>
    </div>
  );
}