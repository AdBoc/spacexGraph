import styles from "../styles/ProjectDetails.module.css"

const ProjectDetails = () => {
  return (
    <div className={styles.details_component}>
      <h2 className={styles.section_title}>Opis</h2>
      <p>Projekt zostal stworzony przy uzyciu create-next-app</p>
      <p>Na stronie znajduje się responsywny(dostosowujący się do wielkości ekranu) wykres, przedstawiający masy payloadów wysyłanych na przestrzeni
        czasu. Punkty potrafią być upakowane w jednym miejscu, więc za pomocą scrolla można przybliżać</p>
      <h2 className={styles.section_title}>Założenia</h2>
      <p>Dane powinny byc zawsze aktualne. Niestety nie mozna w pelni skorzystac z zalet static generation (getStaticProps) poniewaz dane pochadzace z
        api spacex powinny byc zawsze aktualne. Zgodnie z dokumentacją:
        On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows
        frequently updated data, and the page content changes on every request.
        Zamiast tego używam Server-side Rendering</p>
      <p>Jeśli payload posiada wartość null jest ignorowany</p>
      <p>Jeśli istnieje wiele wag payload pobierana jest tylko pierwsza</p>
      <p>Przedzial na grafie generowany jest w calości według danych</p>
      <h2 className={styles.section_title}>Problemy oraz własne zastrzeżenia do projektu</h2>
      <p>api.spacex zwraca uporządkowane dane od najstarszego launcha z wyjątykiem najnowszej, która jest powtórzona</p>
      <p>Do graphql uzywam apollo, ale importowanie calej biblioteki (i tylu dependencji) tylko dla jednego requesta nie ma wiekszego sensu, wiec
        mozna uzyc po prostu fetch {"{launchesPast(limit: 100){launch_date_local, rocket{second_stage{payloads{payload_mass_kg}}}}}"}</p>
    </div>
  );
};

export default ProjectDetails;