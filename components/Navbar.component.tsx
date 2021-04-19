import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Sākums</Link>
        </li>
        <li>
          <Link href="/about-game">Par spēli</Link>
        </li>
        <li>
          <Link href="/about-us">Par mums</Link>
        </li>
      </ul>
    </nav>
  );
}
