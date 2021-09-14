import { Fragment, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const image = "/images/uploadImage.svg";
  const [imagePath, setImagePath] = useState(image);

  const validateFile = () => {
    var src = document.getElementById("upload").files[0];
    if (src) {
      router.push("/result");
    } else {
      alert("Please upload a papaya image before proceed!");
    }
  };

  const uploadFile = () => {
    document.getElementById("upload").click();
  };

  const getImagePreview = () => {
    var src = URL.createObjectURL(document.getElementById("upload").files[0]);
    console.log(src);
    if (src) {
      setImagePath(src);
    } else {
      setImagePath(image);
    }
  };

  return (
    <Fragment>
      <Layout>
        <div className={styles.uploadContainer}>
          <div className={styles.uploadArea} onChange={() => getImagePreview()}>
            <button
              className={styles.uploadAreaImage}
              id="image"
              onClick={() => uploadFile()}
            >
              <img
                className={styles.uploadImage}
                id="uploadImage"
                src={imagePath}
              />
            </button>
            <input
              className={styles.upload}
              accept="image/*"
              id="upload"
              type="file"
            />
            <button
              className={styles.uploadButton}
              type="button"
              onClick={() => validateFile()}
            >
              Upload
            </button>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
}
