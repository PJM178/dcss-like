import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        This is the start of the app
        <button>
          <Link href="/game">
            Tha game
          </Link>
        </button>
      </main>
    </div>
  );
}
