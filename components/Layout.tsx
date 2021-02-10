import Head from "next/head";

const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>SpaceX Graph</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="author" content="Adrian Boczoń"/>
      </Head>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;