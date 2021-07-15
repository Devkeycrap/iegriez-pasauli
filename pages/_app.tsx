// General imports
import Head from "next/head";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Styles & animations
import "../styles/globals.scss";

// Components
import Navbar from "../components/Navbar.component";

// Redux
import { Provider } from "react-redux";
import store from "../store";
import TransitionScene from "../components/TransitionScene.component";

// Main app component
function MyApp({ Component, pageProps }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <Provider store={store}>
      <div className="root">
        <Head>
          <title>Iegriez pasauli</title>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <TransitionScene />
        {!isActive && <Navbar />}
        <AnimatePresence exitBeforeEnter={true}>
          <Component
            {...pageProps}
            setIsActive={setIsActive}
            isActive={isActive}
          />
        </AnimatePresence>
      </div>
    </Provider>
  );
}

export default MyApp;
