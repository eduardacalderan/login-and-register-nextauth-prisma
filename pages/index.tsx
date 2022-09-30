import type { NextPage } from "next";

import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Landing</h1>
      <Link href="/auth/signin">
        <a>Login</a>
      </Link>
      <div>
        <Link href="/auth/signup">
          <a>Register</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
