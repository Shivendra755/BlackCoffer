import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function IntensityBar({ data }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 400, height = 250;

    svg.attr("width", width).attr("height", height);

    const x = d3.scaleBand()
      .domain(data.map(d => d.topic))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([height, 0]);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.topic))
      .attr("y", d => y(d.intensity))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.intensity))
      .attr("fill", "#7c7cff");

  }, [data]);

  return <svg ref={ref}></svg>;
}
