import * as d3 from "d3";
import {svg} from "d3";
import {useEffect, useRef} from "react";

const BarChart = ({rocketData}) => {
  console.log(rocketData);
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => drawGraph(), []);

  const drawGraph = () => {
    const xScale = d3.scaleTime().domain([new Date(2012, 0, 1), new Date()]).range([0, 800]);
    const yScale = d3.scaleLinear().domain([0, 16000]).range([400, 0]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")).ticks(10);
    const yAxis = d3.axisLeft(yScale);

    d3.select(svgRef.current)
      .selectAll("circle")
      .data(rocketData)
      .attr("cx", (d: any) => xScale(d.date))//x
      .attr("cy", (d: any) => yScale(d.mass))//y
      .attr("fill", "navy")
      .attr("r", 2);

    d3.select(svgRef.current).select(".x-axis").style("transform", "translateY(400px)").call(xAxis);
    d3.select(svgRef.current).select(".y-axis").call(yAxis);
  };

  const bars = rocketData.map((data) => <circle key={data.date}/>); //rect

  return (
    <svg
      width={1000}
      height={600}
      ref={svgRef}
    >
      {bars}
      <g className={"x-axis"}/>
      <g className={"y-axis"}/>
    </svg>
  );
};

export default BarChart;

//max range na osi y moge zrobic z wartosc max + 5000