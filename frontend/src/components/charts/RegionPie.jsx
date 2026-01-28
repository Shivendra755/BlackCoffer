import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function RegionPie({ data }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 300;
    const radius = width / 2;

    svg.attr("width", width).attr("height", height);

    const regionCount = d3.rollups(
      data,
      v => v.length,
      d => d.region || "Unknown"
    );

    const pie = d3.pie().value(d => d[1]);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const g = svg.append("g")
      .attr("transform", `translate(${radius},${radius})`);

    g.selectAll("path")
      .data(pie(regionCount))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i) => d3.schemeCategory10[i]);

  }, [data]);

  return <svg ref={ref}></svg>;
}
