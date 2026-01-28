export default function KPI({ title, value }) {
  return (
    <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-xl border border-indigo-500 border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-pink-600 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
      <p className="text-slate-400 text-sm font-medium relative z-10">{title}</p>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent mt-3 relative z-10">{value}</h2>
    </div>
  );
}
