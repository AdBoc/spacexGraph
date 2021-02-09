import {useEffect, useRef, useState} from "react";
import MassScatterChart from "../d3charts/massScatterChart";
import {GetElementType, LaunchesData} from "../types";
import styles from "../styles/BarChart.module.css";

const BarChart = ({launchesData}: { launchesData: LaunchesData }) => {

  const [pointData, setPointData] = useState<GetElementType<LaunchesData> | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => new MassScatterChart(svgRef.current, launchesData).drawChart(), []);

  const points = launchesData.map((data, i) => <circle
    key={data.id}
    className={styles.circle}
    id={i.toString()}
    onMouseEnter={(e: any) => setPointData(launchesData[parseInt(e.target.id)])}
    onMouseLeave={() => setPointData(null)}
  />);

  return (
    <div className={styles.chart_wrapper}>
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
        <p>Hover-over or tap point to see details</p>
        {pointData && <div className={styles.payload_details}>
            <p>Payload details:</p>
            <p>Date: {pointData.date.toISOString().substring(0, 10)}</p>
            <p>Mass: {pointData.mass}</p>
        </div>}
      </div>
    </div>
  )
}

export default BarChart;