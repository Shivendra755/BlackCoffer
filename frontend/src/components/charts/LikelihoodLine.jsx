import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function LikelihoodLine({ data }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const containerWidth = ref.current.parentNode.clientWidth || 400;
    const width = Math.min(containerWidth - 20, 700),
      height = 350,
      margin = { top: 20, right: 30, bottom: 50, left: 60 };

    svg.attr("width", width).attr("height", height);

    const filtered = data
      .filter((d) => (d.end_year || d.start_year) && d.likelihood != null)
      .sort((a, b) => (a.end_year || a.start_year) - (b.end_year || b.start_year));

    if (filtered.length === 0) {
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

    const x = d3
      .scaleLinear()
      .domain(d3.extent(filtered, (d) => +(d.end_year || d.start_year)))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(filtered, (d) => d.likelihood || 0)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add gradient
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "lineGradient")
      .attr("x1", "0%")
      .attr("x2", "100%");
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#06b6d4");
    
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#8b5cf6");

    // Area under curve
    const area = d3.area()
      .x((d) => x(+(d.end_year || d.start_year)))
      .y0(height - margin.bottom)
      .y1((d) => y(d.likelihood));

    svg.append("path")
      .datum(filtered)
      .attr("fill", "url(#lineGradient)")
      .attr("opacity", 0.15)
      .attr("d", area);

    // Line
    const line = d3.line()
      .x((d) => x(+(d.end_year || d.start_year)))
      .y((d) => y(d.likelihood));

    svg.append("path")
      .datum(filtered)
      .attr("fill", "none")
      .attr("stroke", "url(#lineGradient)")
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("d", line);

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

    // X-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5))
      .attr("color", "#64748b")
      .selectAll("text")
      .attr("fill", "#cbd5e1")
      .attr("font-size", "12px");

    // Y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(5))
      .attr("color", "#64748b")
      .selectAll("text")
      .attr("fill", "#cbd5e1")
      .attr("font-size", "12px");

    // X-axis label
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", "12px")
      .text("Year");

    // Y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("x", -(height / 2))
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", "12px")
      .text("Likelihood");

    // Circles with animation
    svg.selectAll("circle")
      .data(filtered)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(+(d.end_year || d.start_year)))
      .attr("cy", (d) => y(d.likelihood))
      .attr("r", 0)
      .attr("fill", "#06b6d4")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .on("mouseover", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 6)
          .attr("fill", "#ec4899");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 4)
          .attr("fill", "#06b6d4");
      })
      .transition()
      .duration(800)
      .delay((d, i) => i * 30)
      .attr("r", 4);

  }, [data]);

  return <svg ref={ref} className="w-full" />;
}
