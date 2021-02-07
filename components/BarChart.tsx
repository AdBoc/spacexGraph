import * as d3 from "d3";
import {useEffect, useRef, useState} from "react";
import {LaunchesData} from "../types";
import styles from "../styles/BarChart.module.css";

const chartHeight = 400;
const chartWidth = 600;

const BarChart = ({launchesData}: { launchesData: LaunchesData }) => {
  const [pointData, setPointData] = useState({date: new Date(), mass: 0});
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => drawGraph(), []);

  const drawGraph = () => {
    const svg = d3.select(svgRef.current);

    const margin = {top: 0, bottom: 20, left: 50, right: 20};
    const height = chartHeight - margin.left - margin.right;
    const width = chartWidth - margin.top - margin.bottom;

    const xScale = d3.scaleTime()
      .domain([launchesData[launchesData.length - 1].date, new Date()])
      .range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...launchesData.map((data) => data.mass)) + 1000])
      .range([height - margin.top, margin.bottom]);

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat("%Y"))
      .ticks(10);
    const yAxis = d3.axisLeft(yScale)
      .ticks(10);

    svg.selectAll("circle")
      .data(launchesData)
      .attr("cx", (data) => xScale(data.date))
      .attr("cy", (data) => yScale(data.mass))
      .attr("fill", "navy")
      .attr("r", 1);

    svg.select(".x-axis")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis);

    svg.select(".y-axis")
      .style("transform", `translateX(${margin.left}px)`)
      .call(yAxis);
  };

  const getPointData = ({target}) => {
    setPointData(launchesData[parseInt(target.id)]);
  };

  const bars = launchesData.map((data, i) => <circle key={data.date.toString()} className={styles.circle} id={i.toString()} onMouseEnter={getPointData}/>); ///rect

  return (
    <div className={styles.chartWrapper}>
      <svg
        className={styles.svgContentResponsive}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        ref={svgRef}
      >
        {bars}
        <g className={"x-axis"}/>
        <g className={"y-axis"}/>
      </svg>
      <p>Date {pointData.date.toISOString().substring(0, 10)}</p>
      {/*<p>Date {pointData.date.toString()}</p>*/}
      <p>Mass {pointData.mass}</p>
    </div>
  );
};

export default BarChart;
