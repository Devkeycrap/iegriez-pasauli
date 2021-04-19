import Head from "next/head";
import Navbar from "../components/Navbar.component";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className="root">
      <Head>
        <title>Iegriez pasauli</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
