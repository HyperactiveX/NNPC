import { Fragment, useState, useEffect } from "react";
import styles from "../styles/Result.module.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();
  const [status, setStatus] = useState(router.query.status);
  const [confidentLevel, setConfidentLevel] = useState(
    parseFloat(router.query.confident_level)
  );

  const statusColor = () => {
    switch (status.toLowerCase()) {
      case "unripe":
        return <span style={{ color: "green" }}>{status}</span>;
      case "medium":
        return <span style={{ color: "#FCD404" }}>{status}</span>;
      default:
        return <span style={{ color: "orange" }}>{status}</span>;
    }
  };

  const confidentLevelColor = () => {
    const x = confidentLevel;
    if (x <= 50) {
      return <span style={{ color: "red" }}>{confidentLevel}%</span>;
    } else if (x > 50 && x <= 80) {
      return <span style={{ color: "orange" }}>{confidentLevel}%</span>;
    } else {
      return <span style={{ color: "green" }}>{confidentLevel}%</span>;
    }
  };

  useEffect(() => {});

  return (
    <Fragment>
      <Layout>
        <div className={styles.uploadContainer}>
          <div className={styles.container}>
            <p className={styles.title}>Result</p>
            <img className={styles.image} src="/images/result.svg" />
            <div className={styles.resultSummary}>
              <div className={styles.status}>
                Your papaya is {statusColor()}
              </div>
              <div className={styles.confident}>
                Confident Level: {confidentLevelColor()}
              </div>
            </div>
            <button
              className={styles.okButton}
              onClick={() => router.push("/")}
            >
              OK
            </button>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
}
