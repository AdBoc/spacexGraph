import * as d3 from "d3";
import {useEffect, useRef, useState} from "react";
import {GetElementType, LaunchesData} from "../types";
import styles from "../styles/BarChart.module.css";

const totalHeight = 400;
const totalWidth = 600;

const BarChart = ({launchesData}: { launchesData: LaunchesData }) => {
  const [pointData, setPointData] = useState<GetElementType<LaunchesData> | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => drawGraph(), []);

  const drawGraph = () => {
    const margin = {top: 0, bottom: 20, left: 50, right: 20};
    const height = totalHeight - margin.left - margin.right;
    const width = totalWidth - margin.top - margin.bottom;

    const xScale = d3.scaleTime()
      .domain([launchesData[launchesData.length - 1].date.getTime() - 2678400000, new Date()])
      .range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...launchesData.map((data) => data.mass)) + 1000])
      .range([height - margin.top, margin.bottom]);

    const xAxis = d3.axisBottom(xScale)
      .ticks(8)
      .tickSize(-height + margin.bottom);
    const yAxis = d3.axisLeft(yScale)
      .ticks(8)
      .tickSize(-width + margin.right + margin.left);

    let zoom = d3.zoom()
      .on("zoom", ({transform}) => {
        let newXXScale = transform.rescaleX(xScale);
        xAxisGroup.call(xAxis.scale(newXXScale));
        points.attr("cx", (d) => newXXScale(d.date))
      })
      .scaleExtent([1, 32])
      .extent([[margin.left, 0], [width - margin.right, height]])
      .translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]]);

    const svg = d3.select(svgRef.current).call(zoom);

    svg.select("clipPath")
      .attr("id", "clip")
      .select("rect")
      .attr("x", margin.left)
      .attr("y", margin.bottom)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom);

    const points = svg.selectAll("circle")
      .attr("clip-path", "url(#clip)")
      .data(launchesData)
      .attr("cx", (data) => xScale(data.date))
      .attr("cy", (data) => yScale(data.mass))
      .attr("fill", "navy")
      .attr("r", 2);

    const xAxisGroup = svg.select(".x-axis")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis);

    svg.select(".y-axis")
      .style("transform", `translateX(${margin.left}px)`)
      .call(yAxis);
  };

  const getPointData = ({target}) => setPointData(launchesData[parseInt(target.id)]);

  const bars = launchesData.map((data, i) => <circle key={data.date.toString()} className={styles.circle} id={i.toString()}
                                                     onMouseEnter={getPointData} onMouseLeave={() => setPointData(null)}/>);

  return (
    <div className={styles.chartWrapper}>
      <svg
        className={styles.svgContentResponsive}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        ref={svgRef}
      >
        <g>{bars}</g>
        <g className={"x-axis"}/>
        <g className={"y-axis"}/>
        <clipPath>
          <rect/>
        </clipPath>
      </svg>
      <div>
        {pointData && <p>Payload details from previous launches</p>}
        {pointData && <p>Date: {pointData.date.toISOString().substring(0, 10)}</p>}
        {pointData && <p>Mass: {pointData.mass}</p>}
      </div>
    </div>
  );
};

export default BarChart;
