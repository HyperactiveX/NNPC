import { Fragment, useState, useEffect } from "react";
import styles from "../styles/Result.module.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [status, setStatus] = useState("Ripe");
  const [confidentLevel, setConfidentLevel] = useState(100);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000");
    console.log(res.data);
  };

  const statusColor = () => {
    switch (status.toLowerCase()) {
      case "underripe":
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

  useEffect(() => {
    fetchData();
  });

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
