import { useEffect, useState } from "react";
import { fetchInsights } from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KPI from "../components/KPI";
import Filters from "../components/Filters";
import IntensityBar from "../components/charts/IntensityBar";
import LikelihoodLine from "../components/charts/LikelihoodLine";
import RegionPie from "../components/charts/RegionPie";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen for search events from Navbar
  useEffect(() => {
    const handleSearch = (event) => {
      const { query } = event.detail;
      if (query && query.trim()) {
        setFilters({ search: query });
      } else {
        setFilters({});
      }
    };

    window.addEventListener("search", handleSearch);
    return () => window.removeEventListener("search", handleSearch);
  }, []);

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      setError(null);
      
      // Build query params only for non-empty filters
      const queryParams = {};
      Object.keys(filters).forEach(key => {
        if (filters[key] !== "" && filters[key] !== null && filters[key] !== undefined) {
          queryParams[key] = filters[key];
        }
      });

      console.log("Fetching with params:", queryParams);

      fetchInsights(queryParams)
        .then(res => {
          console.log("Response received:", res);
          // Handle both response formats: direct array or object with data property
          const responseData = Array.isArray(res.data) ? res.data : (res.data?.data || []);
          console.log("Setting data:", responseData.length, "records");
          setData(responseData);
          setError(null);
        })
        .catch(err => {
          console.error("Error fetching insights:", err);
          setError("Failed to load data. Check backend connection.");
          setData([]);
        })
        .finally(() => setLoading(false));
    };

    loadData();
  }, [filters]);

  const avg = (key) =>
    (data.reduce((a, b) => a + (b[key] || 0), 0) / data.length || 0).toFixed(1);

  return (
    <div className="flex bg-[#0f1622] min-h-screen">
      <Navbar />
      <Sidebar setFilters={setFilters} />
      <div className="ml-64 p-8 bg-gradient-to-br from-[#0f172a] via-[#1a1f3a] to-[#0f172a] min-h-screen text-white w-full pt-28">
        {error && (
          <div className="bg-gradient-to-r from-red-900 to-red-800 text-red-100 p-4 rounded-lg mb-6 border border-red-700 shadow-lg">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">Global Insights</h1>
            <p className="text-slate-400 mt-2">Advanced Analytics & Market Intelligence</p>
          </div>
          {loading && <span className="text-indigo-400 text-sm font-semibold animate-pulse">📡 Loading...</span>}
        </div>

        {data.length === 0 && !loading && !error && (
          <div className="text-center text-slate-400 mt-20 py-12">
            <p className="text-lg">🔍 No data found. Try adjusting your filters.</p>
          </div>
        )}

        {data.length === 0 && !loading && error && (
          <div className="text-center text-red-400 mt-20 py-12">
            <p className="text-lg">{error}</p>
          </div>
        )}

        {data.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <KPI title="Avg Intensity" value={avg("intensity")} />
              <KPI title="Avg Likelihood" value={avg("likelihood")} />
              <KPI title="Avg Relevance" value={avg("relevance")} />
            </div>

            <div className="mb-8 p-6 bg-gradient-to-r from-slate-800 to-slate-800 rounded-xl border border-indigo-500 border-opacity-20 shadow-lg">
              <h3 className="text-lg font-bold text-indigo-300 mb-4">Refine Your Search</h3>
              <Filters setFilters={setFilters} />
            </div>

            {/* Charts Layout - Two rows */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg border border-indigo-500 border-opacity-20 hover:border-opacity-40 transition-all duration-300">
                <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent mb-4">📊 Intensity by Topic</h3>
                <div style={{ overflowX: "auto" }}>
                  <IntensityBar data={data.slice(0, 12)} />
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg border border-indigo-500 border-opacity-20 hover:border-opacity-40 transition-all duration-300">
                <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent mb-4">📈 Likelihood over Years</h3>
                <div style={{ overflowX: "auto" }}>
                  <LikelihoodLine data={data} />
                </div>
              </div>
            </div>

            {/* Full Width Chart */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg border border-indigo-500 border-opacity-20 hover:border-opacity-40 transition-all duration-300">
              <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent mb-4">🌍 Region Distribution</h3>
              <div className="flex justify-center">
                <RegionPie data={data} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
