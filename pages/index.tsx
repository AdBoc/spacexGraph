import {useState} from "react";
import {request} from "graphql-request";
import {launchesDataQuery} from "../queries/queries";
import ProjectDetails from "../components/ProjectDetails";
import ScatterChart from "../components/ScatterChart";
import {LaunchesData, LaunchesDataRequest} from "../types";
import styles from "../styles/Home.module.css";

type IProps = {
  launchesData: LaunchesDataRequest;
};

export default function Home({launchesData}: IProps) {
  const [projectDetails, setProjectDetails] = useState(false);

  const launchesTransformedData = launchesData.launchesPast.reduce((accumulatedLaunches, launch) => {
    launch.rocket.second_stage.payloads.forEach(((payload, index) => {
      if (payload.payload_mass_kg) {
        accumulatedLaunches.push({
          id: launch.launch_date_local + launch.id + index,
          date: new Date(launch.launch_date_local),
          mass: payload.payload_mass_kg
        })
      }
    }))
    return accumulatedLaunches;
  }, []) as LaunchesData;

  return (
    <div>
      <button className={styles.project_details_btn} onClick={() => setProjectDetails(prev => !prev)}>About Project</button>
      {projectDetails && <ProjectDetails/>}
      <ScatterChart launchesData={launchesTransformedData}/>
    </div>
  );
};

export async function getStaticProps() {
  const response = await request<LaunchesDataRequest>("https://api.spacex.land/graphql/", launchesDataQuery);
  return {props: {launchesData: response}}
}