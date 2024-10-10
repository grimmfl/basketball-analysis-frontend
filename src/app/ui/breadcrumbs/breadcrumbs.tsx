"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { parse_path, PATHS } from "@/app/ui/breadcrumbs/breadcrumb-paths";

export function prettifyName(name: string) {
  name = name.substring(0, 1)!.toUpperCase() + name.substring(1, name.length);

  name = name
    .split("_")
    .map((n) => n.substring(0, 1)!.toUpperCase() + n.substring(1, name.length))
    .join(" ");

  return name;
}

export default function Breadcrumbs() {
  const [names, setNames] = useState<string[]>([]);

  function routeTo(idx: number) {
    router.push("/" + crumbs.slice(0, idx + 1).join("/"));
  }

  const path = usePathname();
  const router = useRouter();

  const crumbs = path.split("/").filter((c) => c != "");

  useEffect(() => {
    parse_path(PATHS, crumbs).then((res) => setNames(res));
  }, [path]);

  return (
    <div className="flex">
      {names.map((c, idx) => (
        <span key={idx} className="font-bold flex">
          {idx < names.length - 1 ? (
            <a
              className="underline hover:cursor-pointer"
              onClick={() => routeTo(idx)}
            >
              {prettifyName(c)}
            </a>
          ) : (
            prettifyName(c)
          )}

          {idx < names.length - 1 ? (
            <ChevronRightIcon className="w-4 mx-1"></ChevronRightIcon>
          ) : (
            ""
          )}
        </span>
      ))}
    </div>
  );
}
