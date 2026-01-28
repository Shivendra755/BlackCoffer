import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function RegionPie({ data }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 450;
    const height = 380;
    const radius = Math.min(width, height) / 2.8;

    svg.attr("width", width).attr("height", height);

    if (!data || data.length === 0) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "#94a3b8")
        .attr("font-size", "14px")
        .text("No data");
      return;
    }

    const regionCount = d3.rollups(
      data,
      v => v.length,
      d => d.region || "Unknown"
    ).sort((a, b) => b[1] - a[1]);

    if (regionCount.length === 0) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "#94a3b8")
        .attr("font-size", "14px")
        .text("No data");
      return;
    }

    // Modern color scheme
    const colors = [
      "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", 
      "#fb923c", "#eab308", "#22c55e", "#10b981",
      "#06b6d4", "#0ea5e9"
    ];

    const pie = d3.pie().value(d => d[1]);
    const arc = d3.arc().innerRadius(radius * 0.4).outerRadius(radius);
    const arcHover = d3.arc().innerRadius(radius * 0.4).outerRadius(radius * 1.05);

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2 - 40},${height / 2})`);

    // Add shadows
    const defs = svg.append("defs");
    const filter = defs.append("filter")
      .attr("id", "shadow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    filter.append("feDropShadow")
      .attr("dx", 0)
      .attr("dy", 2)
      .attr("stdDeviation", 3)
      .attr("flood-opacity", 0.3);

    const slices = g.selectAll("path")
      .data(pie(regionCount))
      .enter()
      .append("g");

    // Animated paths
    slices.append("path")
      .attr("d", arc)
      .attr("fill", (_, i) => colors[i % colors.length])
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 2)
      .attr("filter", "url(#shadow)")
      .attr("opacity", 0)
      .on("mouseover", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arcHover)
          .attr("filter", "url(#shadow)");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arc);
      })
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr("opacity", 1);

    // Add center text
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("y", 5)
      .attr("fill", "#cbd5e1")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(regionCount.length);

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("y", 25)
      .attr("fill", "#94a3b8")
      .attr("font-size", "11px")
      .text("Regions");

    // Legend with better styling
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 130}, 20)`);

    legend.selectAll("g")
      .data(regionCount)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(0, ${i * 24})`)
      .each(function(d, i) {
        const group = d3.select(this);
        
        group.append("rect")
          .attr("width", 12)
          .attr("height", 12)
          .attr("rx", 2)
          .attr("fill", colors[i % colors.length])
          .attr("stroke", "#334155")
          .attr("stroke-width", 1);

        group.append("text")
          .attr("x", 18)
          .attr("y", 10)
          .attr("fill", "#cbd5e1")
          .attr("font-size", "12px")
          .attr("font-weight", "500")
          .text(d[0]);

        group.append("text")
          .attr("x", 18)
          .attr("y", 22)
          .attr("fill", "#94a3b8")
          .attr("font-size", "11px")
          .text(`${d[1]} items`);
      });

  }, [data]);

  return <svg ref={ref} className="w-full" />;
}
