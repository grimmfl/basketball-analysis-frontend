'use client'

import {usePathname} from "next/navigation";


export function prettifyName(name: string) {
    name = name.substring(0, 1)!.toUpperCase() + name.substring(1, name.length)

    name = name.split("_").join(" ")

    return name
}


export default function Breadcrumbs() {
    const path = usePathname();

    const crumbs = path.split("/").filter(c => c != "");

    return <div>
        {crumbs.map((c, idx) => <span key={idx} className="font-bold"><a>{prettifyName(c)}</a> {idx < crumbs.length - 1 ? '>' : ''} </span>)}
    </div>;
}