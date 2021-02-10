import styles from "../styles/ProjectDetails.module.css"

const ProjectDetails = () => {
  return (
    <div className={styles.details_component}>
      <h2 className={styles.section_title}>Description</h2>
      <p>Language: Typescript</p>
      <p>Setup: create-next-app</p>
      <p>Chart library: D3</p>
      <p>Website shows chart with payload masses. Some places on chart are more dense, therefore zoom functionality with scroll was implemented.</p>
      <p>Website uses Static Generation (getStaticProps) so chart might not be up-to-date and site is static.</p>
      <a className={styles.github_repo} href="https://github.com/AdBoc/spacexGraph/">Github Repository</a>
      <h2 className={styles.section_title}>My own remarks</h2>
      <p>If payload mass is null then it gets ignored.</p>
      <p>Domain and Range are automatically calculated for my chart (Chart is so flexible it will automatically adjust to any data values and
        dates).</p>
      <p>I have created separate Id's for data returned from api, so react keys can be truly and always unique.</p>
      <p>There is no need to import library for just one fetch, so instead graphql-request I could have used just fetch.</p>
    </div>
  );
};

export default ProjectDetails;