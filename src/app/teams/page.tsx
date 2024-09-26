export default async function Team() {
    const response = await fetch(`${process.env.BACKEND_URL!}/teams`);

    const teams = await response.json();

    return (
        <div>
            <table className="w-max min-w-full p-5">
                <thead>
                <tr className="text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">City</th>
                </tr>
                </thead>
                <tbody>
                {teams.map((t: any) =>
                    <tr key={t.id} className="border-b border-b-gray-900">
                        <td className="p-3">{t.name}</td>
                        <td className="p-3">{t.city}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
