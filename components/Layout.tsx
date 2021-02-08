import Head from "next/head";

const Layout = ({children}) => {
  return (
    <div>
      <Head>
        <title>SpaceX Graph</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="author" content="Adrian Boczoń"/>
      </Head>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;