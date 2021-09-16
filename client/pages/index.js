import { Fragment, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const image = "/images/uploadImage.svg";
  const [imagePath, setImagePath] = useState(image);
  const [file, setFile] = useState("");
  const api = "http://localhost:5000/api";

  const sendFileToBackend = async () => {
    // const res = await axios.get(api);
    // console.log(res.data);
    let formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.get(api + "/uploadFile", {
        params: { file: formData },
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const validateFile = async () => {
    var src = document.getElementById("upload").files[0];
    if (src) {
      await sendFileToBackend();
      // router.push("/result");
    } else {
      alert("Please upload a papaya image before proceed!");
    }
  };

  const uploadFile = () => {
    document.getElementById("upload").click();
  };

  const getImagePreview = () => {
    var src = URL.createObjectURL(document.getElementById("upload").files[0]);
    console.log(document.getElementById("upload").files[0]);
    if (src) {
      setImagePath(src);
      setFile(document.getElementById("upload").files[0]);
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
