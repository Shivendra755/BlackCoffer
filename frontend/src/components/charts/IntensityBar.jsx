import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function IntensityBar({ data }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const containerWidth = ref.current.parentNode.clientWidth || 400;
    const width = Math.min(containerWidth - 20, 700),
      height = 350,
      margin = { top: 20, right: 20, bottom: 80, left: 60 };

    svg.attr("width", width).attr("height", height);

    if (!data || data.length === 0) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "#94a3b8")
        .attr("font-size", "14px")
        .text("No data available");
      return;
    }

    // Group by topic
    const groupedData = Array.from(
      d3.group(data, d => d.topic || "Unknown"),
      ([topic, values]) => ({
        topic,
        intensity: d3.mean(values, d => d.intensity || 0)
      })
    ).sort((a, b) => b.intensity - a.intensity).slice(0, 12);

    const x = d3
      .scaleBand()
      .domain(groupedData.map((d) => d.topic))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(groupedData, (d) => d.intensity || 0)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add gradient
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "barGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#6366f1")
      .attr("stop-opacity", 0.9);
    
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#8b5cf6")
      .attr("stop-opacity", 0.7);

    const g = svg.append("g");

    // Bars with animation
    g.selectAll("rect")
      .data(groupedData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.topic))
      .attr("y", height - margin.bottom)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", "url(#barGradient)")
      .attr("rx", 6)
      .attr("class", "intensity-bar")
      .transition()
      .duration(800)
      .delay((d, i) => i * 50)
      .attr("y", (d) => y(d.intensity))
      .attr("height", (d) => height - margin.bottom - y(d.intensity));

    // Add hover effect
    g.selectAll("rect")
      .on("mouseover", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill", "#ec4899")
          .attr("opacity", 0.9);
        svg.select(".tooltip").remove();
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill", "url(#barGradient)")
          .attr("opacity", 1);
      });

    // X-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .attr("color", "#64748b")
      .selectAll("text")
      .attr("fill", "#cbd5e1")
      .attr("font-size", "11px")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("dx", "-0.5em")
      .attr("dy", "0.5em");

    // Y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(5))
      .attr("color", "#64748b")
      .selectAll("text")
      .attr("fill", "#cbd5e1")
      .attr("font-size", "12px");

    // Y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("x", -(height / 2))
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", "12px")
      .text("Average Intensity");

    // Grid lines
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y)
        .tickSize(-(width - margin.left - margin.right))
        .tickFormat("")
        .ticks(5)
      )
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.2)
      .attr("color", "transparent");

  }, [data]);

  return <svg ref={ref} className="w-full" />;
}
