import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BarChart from "../components/BarChart";

export default function Home({data}) {
  const spacexData = data.data.launchesPast.map((data) => ({
      date: new Date(data.launch_date_local),
      mass: data.rocket.second_stage.payloads[0].payload_mass_kg
    })
  ).filter((data) => data.mass !== null);
  spacexData.shift();

  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Graph</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="author" content="Adrian Boczoń"/>
      </Head>
      <main className={styles.main}>
        <div>
          <p>SpaceX Graph</p>
          <BarChart rocketData={spacexData}/>
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("https://api.spacex.land/graphql/", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query: '{launchesPast(limit:100){launch_date_local,rocket{second_stage{payloads{payload_mass_kg}}}}}'}),
  });
  const data = await res.json();
  return {props: {data}};
}
