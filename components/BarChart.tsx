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
      .domain([launchesData[launchesData.length - 1].date.getTime() - (31*24*60*60*1000), new Date()])
      .range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...launchesData.map((data) => data.mass)) + 1000])
      .range([height - margin.top, margin.bottom]);

    const xAxis = d3.axisBottom(xScale)
      .ticks(8);
    const yAxis = d3.axisLeft(yScale)
      .ticks(8);

    // svg.select("clipPath")
    //   .attr("x", margin.left)
    //   .attr("y", margin.top)
    //   .attr("width", width - margin.left - margin.right)
    //   .attr("height", height - margin.top - margin.bottom);

    var clip = svg.append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom);

    const points = svg.selectAll("circle")
      .attr("clip-path", "url(#clip)")
      .data(launchesData)
      .attr("cx", (data) => xScale(data.date))
      .attr("cy", (data) => yScale(data.mass))
      .attr("fill", "navy")
      .attr("r", 1)

    const xAxisGroup = svg.select(".x-axis")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis);

    const yAxisGroup = svg.select(".y-axis")
      .style("transform", `translateX(${margin.left}px)`)
      .call(yAxis);

    // let zoom = d3.zoom().on("zoom", ({transform}) => {
    //   let newXXScale = transform.rescaleX(xScale);
    //   let newYScale = transform.rescaleY(yScale);
    //   xAxis.scale(newXXScale);
    //   yAxis.scale(newYScale);
    //   xAxisGroup.call(newXXScale);
    //   yAxisGroup.call(newYScale);
    //   points.attr("cx", (d) => newXXScale(d.date))
    //     .attr("cy", (d) => newYScale(d.mass));
    //   console.log("zoom");
    // });
    // svg.call(zoom);

    let zoom = d3.zoom()
      .on("zoom", ({transform}) => {
        let newXXScale = transform.rescaleX(xScale);
        // let newYScale = transform.rescaleY(yScale);
        xAxisGroup.call(xAxis.scale(newXXScale));
        // yAxisGroup.call(yAxis.scale(newYScale));
        points.attr("cx", (d) => newXXScale(d.date))
        // .attr("cy", (d) => newYScale(d.mass));
      }).scaleExtent([1, 32])
      .extent([[margin.left, 0], [width - margin.right, height]])
      .translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]]);

    svg.call(zoom);
  };

  const getPointData = ({target}) => setPointData(launchesData[parseInt(target.id)]);

  const bars = launchesData.map((data, i) => <circle key={data.date.toString()} className={styles.circle} id={i.toString()}
                                                     onMouseEnter={getPointData}/>); ///rect

  return (
    <div className={styles.chartWrapper}>
      <svg
        className={styles.svgContentResponsive}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        ref={svgRef}
      >
        <g>{bars}</g>
        <g className={"x-axis"}/>
        <g className={"y-axis"}/>
      </svg>
      <p>Date: {pointData.date.toISOString().substring(0, 10)}</p>
      <p>Mass: {pointData.mass}</p>
    </div>
  );
};

export default BarChart;
