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
    let formData = new FormData();
    formData.append("file", file);
    try {
      checkLoading(true);
      const res = await axios.post(api + "/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });
      checkLoading(false);
      return res.data.payload;
    } catch (err) {
      console.log(err);
    }
  };

  const validateFile = async () => {
    var src = document.getElementById("upload").files[0];
    if (src) {
      // let result = await sendFileToBackend();
      let result = await sendFileToBackend();
      router.push({
        pathname: "/result",
        query: {
          status: result.status,
          confident_level: result.confident_level,
        },
      });
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

  const checkLoading = (loading) => {
    if (loading) {
      document.body.style.cursor = "wait";
      document.getElementById("demo").style.cursor = "wait";
    } else {
      document.body.style.cursor = "default";
    }
  };

  return (
    <Fragment>
      <Layout>
        <div className={styles.uploadContainer} id="demo">
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
