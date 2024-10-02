"use client";

import { useRouter } from "next/navigation";

export default function TeamRow({ team }: { team: any }) {
  const router = useRouter();
  function select() {
    router.push(`/teams/${team.id}/`);
  }

  return (
    <tr
      className="border-b border-b-gray-900 hover:cursor-pointer"
      onClick={select}
    >
      <td className="p-3">{team.name}</td>
      <td className="p-3">{team.city}</td>
    </tr>
  );
}
