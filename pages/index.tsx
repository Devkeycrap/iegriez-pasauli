import "../styles/Home.module.scss";
import Link from "next/link";
import Head from "next/head";
import Wheel from "../components/Wheel.component";

export default function Home() {
  return (
    <div className="home">
      <main>
        <h1>
          Vai zini, kas ir <span>aprites ekonomika</span>?
        </h1>
        <p>Pārbaudi savas zināšanas, spēlējot spēli “Iegriez pasauli”!</p>
        <Link href="game">
          <button className="btn btn-orange">Sākt spēli</button>
        </Link>
      </main>
    </div>
  );
}
