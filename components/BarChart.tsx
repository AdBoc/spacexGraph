import * as d3 from "d3";
import {useEffect, useRef, useState} from "react";
import {GetElementType, LaunchesData} from "../types";
import styles from "../styles/BarChart.module.css";

const totalHeight = 500;
const totalWidth = 560;

const BarChart = ({launchesData}: { launchesData: LaunchesData }) => {
  const [pointData, setPointData] = useState<GetElementType<LaunchesData> | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => drawGraph(), []);

  const drawGraph = () => {
    let margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = totalWidth - margin.left - margin.right,
      height = totalHeight - margin.top - margin.bottom;

    let svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .select("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let xScale = d3.scaleTime()
      .domain([launchesData[launchesData.length - 1].date.getTime() - 2678400000, new Date()])
      .range([0, width]);
    let yScale = d3.scaleLinear()
      .domain([0, Math.max(...launchesData.map((data) => data.mass)) + 1000])
      .range([height, 0]);

    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    let xAxisGroup = svg.select("#x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    let yAxisGroup = svg.select("#y-axis")
      .call(yAxis);

    d3.select("#clip-rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0);

    let scatter = svg.select("#scatter")
      .attr("clip-path", "url(#clip)");

    scatter.selectAll("circle")
      .data(launchesData)
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.mass))
      .attr("fill", "navy")
      .attr("r", 2);

    let zoom = d3.zoom()
      .scaleExtent([1, 100])
      .extent([[0, 0], [width, height]])
      .translateExtent([[0, 0], [width + margin.left - margin.right, totalHeight - margin.top - margin.bottom]])
      .on("zoom", updateChart);

    svg.select("#zoom-event")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .call(zoom);

    function updateChart({transform}) {
      let newX = transform.rescaleX(xScale);
      let newY = transform.rescaleY(yScale);

      xAxisGroup.call(d3.axisBottom(newX));
      yAxisGroup.call(d3.axisLeft(newY));

      scatter.selectAll("circle")
        .attr("cx", (d: GetElementType<LaunchesData>) => newX(d.date))
        .attr("cy", (d: GetElementType<LaunchesData>) => newY(d.mass));
    }
  }

  const points = launchesData.map((data, i) => <circle
    key={data.id}
    className={styles.circle}
    id={i.toString()}
    onMouseEnter={(e: any) => setPointData(launchesData[parseInt(e.target.id)])}
    onMouseLeave={() => setPointData(null)}
  />);

  return (
    <div className={styles.chartWrapper}>
      <svg ref={svgRef}>
        <g>
          <rect id="zoom-event"/>
          <g id="scatter">
            {points}
          </g>
          <g id="x-axis"/>
          <g id="y-axis"/>
          <defs>
            <clipPath id="clip">
              <rect id="clip-rect"/>
            </clipPath>
          </defs>
        </g>
      </svg>
      <div>
        <p>Hover-over/tap point to see details</p>
        {pointData && <div>
            <p>Payload details:</p>
            <p>Date: {pointData.date.toISOString().substring(0, 10)}</p>
            <p>Mass: {pointData.mass}</p>
        </div>}
      </div>
    </div>
  )
}

export default BarChart;