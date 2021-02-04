import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Graph</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Adrian Boczoń" />
      </Head>
      <main className={styles.main}>
        <div>
          <p>SpaceX Graph</p>
        </div>
      </main>
    </div>
  );
}
