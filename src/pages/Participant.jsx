import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import styles from "./volunteer.module.css";

const Participant = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Attempt to fetch user data from the API
        const response = await axios.get(
          `https://api.example.com/volunteer/${id}`
        );
        setUserData(response.data);
      } catch (err) {
        // On failure, set dummy data
        console.error("Failed to fetch user data, using dummy data." + err);
        // setError("Failed to fetch user data. Displaying fallback data.");
        setUserData({
          name: "أحمد محمد",
          organization: "شركة مثال",
          phone: "0551234567",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  //   if (error) return <p>{error}</p>;

  return (
    <div className={styles.pageContainer}>
      {/* Top Images */}
      <div className={styles.topImages}>
        <img
          src="/path-to-image-1.jpg"
          alt="Image 1"
          className={styles.image}
        />
        <img
          src="/path-to-image-2.jpg"
          alt="Image 2"
          className={styles.image}
        />
      </div>

      {/* QR Code */}
      <div className={styles.centerSection}>
        <h1>زائر</h1>
        <div className={styles.qrCodeSection}>
          <div className={styles.qrCodeOuterWrapper}>
            <div className={styles.qrCodeWrapper}>
              <QRCodeSVG value={id} size={160} />
            </div>
          </div>
        </div>

        {/* User Data */}
        <div className={styles.userDataSection}>
          <div className={styles.userDataRow}>
            <strong>الاسم:</strong> {userData?.name || "N/A"}
          </div>
          <div className={styles.userDataRow}>
            <strong>الجهة:</strong> {userData?.organization || "N/A"}
          </div>
          <div className={styles.userDataRow}>
            <strong>رقم الجوال:</strong> {userData?.phone || "N/A"}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <p>جميع الحقوق محفوظة لمؤسسة القمة البرمجية 2025</p>
      </div>
    </div>
  );
};

export default Participant;
