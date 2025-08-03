"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/navigation";

interface NavigationItemsProps {
  onItemClick?: () => void;
}

export function NavigationItems({ onItemClick }: NavigationItemsProps) {
  const pathname = usePathname();

  return (
    <ul role="list" className="-mx-2 space-y-1">
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className={cn(
              pathname === item.href
                ? "bg-accent text-primary"
                : "text-foreground hover:text-primary hover:bg-accent",
              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            )}
            onClick={onItemClick}
          >
            <item.icon
              className={cn(
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-primary",
                "h-6 w-6 shrink-0"
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}