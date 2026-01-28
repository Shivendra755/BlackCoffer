import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function LikelihoodLine({ data }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 250;

    svg.attr("width", width).attr("height", height);

    const filtered = data.filter(d => d.start_year);

    const x = d3.scaleLinear()
      .domain(d3.extent(filtered, d => d.start_year))
      .range([40, width - 20]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(filtered, d => d.likelihood)])
      .range([height - 30, 20]);

    const line = d3.line()
      .x(d => x(d.start_year))
      .y(d => y(d.likelihood));

    svg.append("path")
      .datum(filtered)
      .attr("fill", "none")
      .attr("stroke", "#00d4ff")
      .attr("stroke-width", 2)
      .attr("d", line);

  }, [data]);

  return <svg ref={ref}></svg>;
}
