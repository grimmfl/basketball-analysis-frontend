"use client";

import { useRouter } from "next/navigation";

interface NavbarItem {
  path: string;
  name: string;
}

const items: NavbarItem[] = [
  { name: "Teams", path: "/teams" },
  { name: "Players", path: "/players" },
  { name: "League Leaders", path: "/league-leaders" },
  { name: "Visualizer", path: "/visualizer" },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="flex border-b border-b-gray-900 px-5">
      {items.map((i, idx) => (
        <button
          key={idx}
          onClick={() => router.push(i.path)}
          className="py-2 w-40 px-5 border border-gray-900 hover:bg-gray-900"
        >
          {i.name}
        </button>
      ))}
    </div>
  );
}
