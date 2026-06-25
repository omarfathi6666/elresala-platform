import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="font-medium text-blue-700 hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-bold text-slate-700" : "font-medium"}>
                  {item.label}
                </span>
              )}

              {!isLast ? <span>&gt;</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
