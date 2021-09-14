import Head from "next/head";
import { Fragment, useState } from "react";
import styles from "../styles/Layout.module.css";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <Fragment>
      <Head>
        <title>NNPC</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.page}>
        <div className={styles.navBar}>
          <span className={styles.groupName} onClick={() => router.push("/")}>
            Ngai Ngai Papaya Classifier
          </span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </Fragment>
  );
};

export default Layout;
