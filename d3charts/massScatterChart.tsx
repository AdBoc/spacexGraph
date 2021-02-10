import * as d3 from "d3";
import {GetElementType, LaunchesData} from "../types";

class MassScatterChart {
  private readonly totalWidth = 560;
  private readonly totalHeight = 500;
  private readonly margin = {top: 10, right: 30, bottom: 30, left: 60};
  private readonly svgRef: SVGSVGElement;
  private readonly data: LaunchesData;

  constructor(svgRef: SVGSVGElement, data: LaunchesData) {
    this.svgRef = svgRef;
    this.data = data;
  }

  public drawChart() {
      let width = this.totalWidth - this.margin.left - this.margin.right,
      height = this.totalHeight - this.margin.top - this.margin.bottom;

    let svg = d3.select(this.svgRef)
      .attr("width", this.totalWidth)
      .attr("height", this.totalHeight)
      .select("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    let xScale = d3.scaleTime()
      .domain([this.data[this.data.length - 1].date.getTime() - 2678400000, new Date()])
      .range([0, width]);
    let yScale = d3.scaleLinear()
      .domain([0, Math.max(...this.data.map((data) => data.mass)) + 1000])
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
      .data(this.data)
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.mass))
      .attr("fill", "navy")
      .attr("opacity", "0.7")
      .attr("r", 3);

    let zoom = d3.zoom()
      .scaleExtent([1, 500])
      .extent([[0, 0], [width, height]])
      .translateExtent([[0, 0], [width, height]])
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
}

export default MassScatterChart;