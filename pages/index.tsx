import {useState} from "react";
import Error from "next/error";
import BarChart from "../components/BarChart";
import ProjectDetails from "../components/ProjectDetails";

export default function Home({errorCode, launchesData}) {
  const [projectDetails, setProjectDetails] = useState(false);

  const launchesTransformedData = launchesData.data.launchesPast
    .map((data) => ({
      date: new Date(data.launch_date_local),
      mass: data.rocket.second_stage.payloads[0].payload_mass_kg
    }))
    .filter((data) => data.mass)
    .splice(1);

  if (errorCode) {
    return <Error statusCode={errorCode.status} title={"error while fetching"}/>;
  }

  return (
    <div>
      <button onClick={() => setProjectDetails(prev => !prev)}>About Project</button>
      {projectDetails && <ProjectDetails/>}
      <BarChart launchesData={launchesTransformedData}/>
    </div>
  );
};

export async function getServerSideProps() {
  const launchesResponse = await fetch("https://api.spacex.land/graphql/", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query: '{launchesPast(limit:100){launch_date_local,rocket{second_stage{payloads{payload_mass_kg}}}}}'}),
  });
  const errorCode = launchesResponse.ok ? false : launchesResponse.status;
  const launchesData = await launchesResponse.json();
  return {props: {errorCode, launchesData}};
}