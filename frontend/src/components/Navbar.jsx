import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.dispatchEvent(
        new CustomEvent("search", { detail: { query: searchQuery } })
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    window.dispatchEvent(
      new CustomEvent("search", { detail: { query: "" } })
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#0f172a] via-[#1a1f3a] to-[#0f172a] flex items-center px-8 text-white z-40 shadow-2xl border-b border-indigo-500 border-opacity-20 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/50">
          <HiSparkles />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">InsightViz</h1>
          <p className="text-xs text-slate-400">Advanced Analytics Platform</p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="relative hidden md:block">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 text-lg" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search insights..."
            className="bg-slate-800 bg-opacity-50 placeholder-slate-500 text-sm rounded-lg pl-12 pr-10 py-3 border border-slate-700 hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20 outline-none text-white w-80 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white text-lg cursor-pointer transition-colors"
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2 cursor-pointer transition-all duration-200 shadow-lg shadow-indigo-500/30"
        >
          <FiSearch size={18} />
          Search
        </button>
      </div>
    </div>
  );
}
