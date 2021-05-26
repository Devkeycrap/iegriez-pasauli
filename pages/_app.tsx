// General imports
import Head from "next/head";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useSelector } from "react-redux";

import "../styles/globals.scss";

// Components
import Navbar from "../components/Navbar.component";
import Spinner from "../components/Spinner.component";

// Redux
import { Provider } from "react-redux";
import store from "../store";

// Main app component
function MyApp({ Component, pageProps }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="root">
      <Head>
        <title>Iegriez pasauli</title>
      </Head>
      {!isActive && <Navbar />}
      <AnimatePresence exitBeforeEnter={true}>
        <Component
          {...pageProps}
          setIsActive={setIsActive}
          isActive={isActive}
        />
      </AnimatePresence>
    </div>
  );
}

export default MyApp;
