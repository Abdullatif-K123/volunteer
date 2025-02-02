import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import styles from "./volunteer.module.css";
import NotFoundUser from "./NotFoundUser";
import { MagnifyingGlass } from "react-loader-spinner";
import PhoneImage from "../assets/image-phone.png";
import LogoMontada from "../assets/logo-montada.png";
import IdLogo from "../assets/id-logo.png";
const Volunteer = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_BASE_API_KEY;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Attempt to fetch user data from the API

        const response = await axios.get(
          `${baseUrl}/${apiKey}/volunteer/profile/${id}`
        );

        setUserData(response.data.volunteer);
      } catch (err) {
        // On failure, set dummy data
        console.error("Failed to fetch user data, using dummy data." + err);
        setError("Failed to fetch user data. Displaying fallback data.");
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

  if (loading)
    return (
      <div className={styles.loading}>
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
        <p>جاري البحث...</p>
      </div>
    );
  if (error) return <NotFoundUser />;

  return (
    <div className={styles.pageContainer}>
      {/* Top Images */}
      <div className={styles.topImages}>
        <img src={PhoneImage} alt="Image 1" className={styles.image} />
        <img src={LogoMontada} alt="Image 2" className={styles.image2} />
      </div>

      {/* QR Code */}
      <div className={styles.centerSection}>
        <h1>متطوع</h1>
        <div className={styles.qrCodeSection}>
          <div className={styles.qrCodeOuterWrapper}>
            <div className={styles.qrCodeWrapper}>
              {userData?.attendance ? (
                <p style={{ fontSize: "40px", fontWeight: "bold" }}>
                  تم تأكيد الحضور بنجاح
                </p>
              ) : (
                <QRCodeSVG value={id} size={150} />
              )}
            </div>
          </div>
        </div>
        <img
          src={IdLogo}
          alt="Image 1"
          className={styles.image}
          style={{ marginTop: "-35px" }}
        />
        {/* User Data */}
        <div className={styles.userDataSection}>
          {!userData?.attendance ? (
            <div className={styles.userDataRowAlert}>
              <p>
                الرجاء ابراز الرمز عند الحضور واتمام اجراء مسح الرمز لدى
                الاستقبال
              </p>
            </div>
          ) : (
            <>
              <div className={styles.userDataRow}>
                <p>
                  <strong>الاسم:</strong> {userData?.name || "لا يوجد"}
                </p>
              </div>

              <div className={styles.userDataRow}>
                <p>
                  <strong>رقم الجوال:</strong> {userData?.phone || "لا يوجد"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
