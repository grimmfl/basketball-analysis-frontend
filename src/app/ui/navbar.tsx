"use client";

import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

interface NavbarItem {
  path: string;
  name: string;
}

const items: NavbarItem[] = [
  { name: "Teams", path: "/teams" },
  { name: "Players", path: "/players" },
  { name: "League Leaders", path: "/league-leaders" },
  { name: "Visualizer", path: "/visualizer" }
];

export default function Navbar() {
  const router = useRouter();

  const pathname = usePathname();
  const currentPath = "/" + pathname.substring(1).split("/")[0];

  return (
    <div className="flex border-b bg-nav border-background px-5 border-collapse">
      {items.map((i, idx) => (
        <button
          key={idx}
          onClick={() => router.push(i.path)}
          className={clsx(
            "py-3 w-40 px-5 border-x border-background hover:bg-background",
            {
              "bg-background": i.path === currentPath
            }
          )}
        >
          {i.name}
        </button>
      ))}
    </div>
  );
}
