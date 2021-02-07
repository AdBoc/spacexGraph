import Head from "next/head";
import styles from "../styles/Home.module.css";

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Graph</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="author" content="Adrian Boczoń"/>
      </Head>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;