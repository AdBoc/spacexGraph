import BarChart from "../components/BarChart";

export default function Home({launchesData}) {

  const launchesTransformedData = launchesData.data.launchesPast
    .map((data) => ({
      date: new Date(data.launch_date_local),
      mass: data.rocket.second_stage.payloads[0].payload_mass_kg
    }))
    .filter((data) => data.mass !== null)
    .splice(1);

  return (
    <div>
      <p>SpaceX Graph</p>
      <BarChart launchesData={launchesTransformedData}/>
    </div>
  );
};

export async function getServerSideProps() {
  //try catch??
  const launchesResponse = await fetch("https://api.spacex.land/graphql/", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query: '{launchesPast(limit:100){launch_date_local,rocket{second_stage{payloads{payload_mass_kg}}}}}'}),
  });
  const launchesData = await launchesResponse.json();
  return {props: {launchesData}};
}

//uwagi do projektu/uzasadenienie podejscia/decyzji i zalozenia

//projekt jest tylko jedna strona wiec nie dodawalem takich podstawowtych rzeczy jak routing

//projekt zostal stworzony przy uzyciu create-next-app

//Założenie: Dane powinny byc zawsze aktualne. niestety nie mozna w pelni skorzystac z zalet static generation (getStaticProps) poniewaz dane pochadzace z api spacex powinny byc zawsze aktualne. Zgodnie z dokumentaccja :
//On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.
//Zamiast tego uzywa Server-side Rendering

//do graphql uzywam apollo, ale importowanie calej biblioteki (i tylu dependencji) tylko dla jednego requesta nie ma wiekszego sensu, wiec mozna uzyc po prostu fetch (alt branch?)

//mozna zintegrowac projekt z d3 na rozne sposoby (1 pozwalajac reactowi na management domem albo d3) w tym projekcie to react przejmuje kontrole nad dom w pelni

// '{launchesPast(limit: 100){launch_date_local,rocket{second_stage{payloads{payload_mass_kg}}}}}'

//przedzial na grafie generowany jest w calosci wedlug danych