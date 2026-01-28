import { useEffect, useState } from "react";
import { fetchInsights } from "../services/api";
import Sidebar from "../components/Sidebar";
import KPI from "../components/KPI";
import Filters from "../components/Filters";
import IntensityBar from "../components/charts/IntensityBar";
import LikelihoodLine from "../components/charts/LikelihoodLine";
import RegionPie from "../components/charts/RegionPie";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchInsights(filters).then(res => setData(res.data));
  }, [filters]);

  const avg = (key) =>
    (data.reduce((a, b) => a + (b[key] || 0), 0) / data.length || 0).toFixed(1);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 bg-[#1e1e2d] min-h-screen text-white w-full">
        <h1 className="text-2xl mb-4">Global Insight Analytics</h1>

        <div className="flex gap-4 mb-6">
          <KPI title="Avg Intensity" value={avg("intensity")} />
          <KPI title="Avg Likelihood" value={avg("likelihood")} />
          <KPI title="Avg Relevance" value={avg("relevance")} />
        </div>

        <Filters setFilters={setFilters} />

        <div className="grid grid-cols-3 gap-6 mt-6">
          <IntensityBar data={data.slice(0,10)} />
          <LikelihoodLine data={data} />
          <RegionPie data={data} />
        </div>
      </div>
    </div>
  );
}
