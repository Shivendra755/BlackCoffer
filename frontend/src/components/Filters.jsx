import { useState } from "react";
import { FiFilter, FiRefreshCw, FiCheck } from "react-icons/fi";

export default function Filters({ setFilters }) {
  const [local, setLocal] = useState({
    topic: "",
    region: "",
    year: "",
    country: "",
    sector: "",
    pestle: "",
    source: "",
    city: "",
    swot: ""
  });

  const apply = () => {
    setFilters({ ...local });
  };

  const reset = () => {
    setLocal({
      topic: "",
      region: "",
      year: "",
      country: "",
      sector: "",
      pestle: "",
      source: "",
      city: "",
      swot: ""
    });
    setFilters({});
  };

  const FilterInput = ({ label, value, onChange, placeholder, type = "text", options }) => (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">{label}</label>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-800 bg-opacity-50 px-3 py-2.5 rounded-lg text-white text-sm border border-slate-700 hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20 outline-none transition-all duration-200"
        >
          {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-800 bg-opacity-50 px-3 py-2.5 rounded-lg text-white text-sm border border-slate-700 placeholder-slate-500 hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20 outline-none transition-all duration-200"
        />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <FilterInput
          label="Topic"
          value={local.topic}
          onChange={(val) => setLocal(s => ({ ...s, topic: val }))}
          options={[
            { value: "", label: "All Topics" },
            { value: "oil", label: "Oil" },
            { value: "gas", label: "Gas" },
            { value: "renewable", label: "Renewable" }
          ]}
        />

        <FilterInput
          label="Region"
          value={local.region}
          onChange={(val) => setLocal(s => ({ ...s, region: val }))}
          options={[
            { value: "", label: "All Regions" },
            { value: "World", label: "World" },
            { value: "Northern America", label: "North America" }
          ]}
        />

        <FilterInput
          label="End Year"
          value={local.year}
          onChange={(val) => setLocal(s => ({ ...s, year: val }))}
          placeholder="e.g. 2023"
          type="number"
        />

        <FilterInput
          label="Sector"
          value={local.sector}
          onChange={(val) => setLocal(s => ({ ...s, sector: val }))}
          options={[
            { value: "", label: "All Sectors" },
            { value: "Energy", label: "Energy" },
            { value: "Technology", label: "Technology" },
            { value: "Finance", label: "Finance" }
          ]}
        />

        <FilterInput
          label="PESTLE"
          value={local.pestle}
          onChange={(val) => setLocal(s => ({ ...s, pestle: val }))}
          options={[
            { value: "", label: "All PESTLE" },
            { value: "Political", label: "Political" },
            { value: "Economic", label: "Economic" },
            { value: "Social", label: "Social" },
            { value: "Technological", label: "Technological" },
            { value: "Legal", label: "Legal" },
            { value: "Environmental", label: "Environmental" }
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FilterInput
          label="Country"
          value={local.country}
          onChange={(val) => setLocal(s => ({ ...s, country: val }))}
          placeholder="e.g. USA"
        />

        <FilterInput
          label="City"
          value={local.city}
          onChange={(val) => setLocal(s => ({ ...s, city: val }))}
          placeholder="e.g. New York"
        />

        <FilterInput
          label="Source"
          value={local.source}
          onChange={(val) => setLocal(s => ({ ...s, source: val }))}
          placeholder="e.g. Reuters"
        />

        <FilterInput
          label="SWOT"
          value={local.swot}
          onChange={(val) => setLocal(s => ({ ...s, swot: val }))}
          options={[
            { value: "", label: "All SWOT" },
            { value: "Strength", label: "Strength" },
            { value: "Weakness", label: "Weakness" },
            { value: "Opportunity", label: "Opportunity" },
            { value: "Threat", label: "Threat" }
          ]}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={apply}
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-lg shadow-indigo-500/30"
        >
          <FiCheck size={18} />
          Apply Filters
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-lg text-slate-300 font-semibold border-2 border-slate-700 hover:border-indigo-500 hover:text-indigo-300 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
        >
          <FiRefreshCw size={18} />
          Reset
        </button>
      </div>
    </div>
  );
}

