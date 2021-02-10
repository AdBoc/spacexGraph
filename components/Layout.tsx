import Head from "next/head";

const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>SpaceX Graph</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="author" content="Adrian Boczoń"/>
        <meta name="description" content="spacex masses of payloads on chart"/>
      </Head>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;