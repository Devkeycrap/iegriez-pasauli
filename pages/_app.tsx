import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/Navbar.component";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="root">
      <Head>
        <title>Iegriez pasauli</title>
      </Head>
      {!isActive && <Navbar />}
      <Component {...pageProps} setIsActive={setIsActive} isActive={isActive} />
    </div>
  );
}

export default MyApp;
