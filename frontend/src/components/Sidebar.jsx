import { MdDashboard, MdShowChart } from "react-icons/md";
import { FiGlobe } from "react-icons/fi";
import { GiOilDrum } from "react-icons/gi";
import { BiLeaf } from "react-icons/bi";
import { IoFlash, IoLaptop, IoWallet } from "react-icons/io5";
import { FaChartBar, FaLeaf, FaCheckCircle, FaTimesCircle, FaLightbulb, FaExclamationTriangle, FaGasPump } from "react-icons/fa";

export default function Sidebar({ setFilters }) {
  const quick = (f) => {
    if (setFilters) setFilters(f);
  };

  const menuItems = [
    { label: "Oil", filter: { topic: "oil" }, icon: GiOilDrum },
    { label: "Gas", filter: { topic: "gas" }, icon: FaGasPump },
    { label: "Renewable", filter: { topic: "renewable" }, icon: BiLeaf },
  ];

  const regionItems = [
    { label: "World", filter: { region: "World" }, icon: FiGlobe },
    { label: "North America", filter: { region: "Northern America" }, icon: FiGlobe },
  ];

  const sectorItems = [
    { label: "Energy", filter: { sector: "Energy" }, icon: IoFlash },
    { label: "Technology", filter: { sector: "Technology" }, icon: IoLaptop },
    { label: "Finance", filter: { sector: "Finance" }, icon: IoWallet },
  ];

  const pestleItems = [
    { label: "Political", filter: { pestle: "Political" }, icon: MdShowChart },
    { label: "Economic", filter: { pestle: "Economic" }, icon: FaChartBar },
    { label: "Environmental", filter: { pestle: "Environmental" }, icon: FaLeaf },
  ];

  const swotItems = [
    { label: "Strength", filter: { swot: "Strength" }, icon: FaCheckCircle, color: "text-green-400" },
    { label: "Weakness", filter: { swot: "Weakness" }, icon: FaTimesCircle, color: "text-red-400" },
    { label: "Opportunity", filter: { swot: "Opportunity" }, icon: FaLightbulb, color: "text-yellow-400" },
    { label: "Threat", filter: { swot: "Threat" }, icon: FaExclamationTriangle, color: "text-orange-400" },
  ];

  const FilterSection = ({ title, items }) => (
    <div className="mb-8">
      <h3 className="text-xs font-bold text-indigo-300 mb-3 uppercase tracking-wider">{title}</h3>
      <div className="space-y-2">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const colorClass = item.color || "text-slate-300";
          return (
            <button
              key={idx}
              onClick={() => quick(item.filter)}
              className={`w-full text-left px-4 py-2.5 rounded-lg bg-slate-800 bg-opacity-30 hover:bg-opacity-60 ${colorClass} hover:text-white transition-all duration-200 text-sm cursor-pointer flex items-center gap-3 group`}
            >
              <Icon size={16} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-64 bg-gradient-to-b from-[#0f172a] to-[#1a1f3a] h-screen p-6 fixed pt-24 border-r border-indigo-500 border-opacity-10 overflow-y-auto shadow-xl">
      <h2 className="text-xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">Navigation</h2>

      {/* Main Navigation */}
      <div className="mb-8">
        <button
          onClick={() => quick({})}
          className="w-full text-left px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-200 cursor-pointer flex items-center gap-3 font-semibold"
        >
          <MdDashboard size={20} />
          Overview
        </button>
      </div>

      <FilterSection title="Topics" items={menuItems} />
      <FilterSection title="Regions" items={regionItems} />
      <FilterSection title="Sectors" items={sectorItems} />
      <FilterSection title="PESTLE" items={pestleItems} />
      <FilterSection title="SWOT" items={swotItems} />
    </div>
  );
}
