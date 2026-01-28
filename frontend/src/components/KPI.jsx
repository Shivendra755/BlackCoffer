export default function KPI({ title, value }) {
  return (
    <div className="bg-[#2f3349] p-4 rounded-xl w-48">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
