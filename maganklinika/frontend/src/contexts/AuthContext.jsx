import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/Axios";
import { useNavigate } from "react-router-dom";
import useAdminContext from "./AdminContext";
import useDoctorContext from "./DoctorContext";
import usePatientContext from "./PatientsContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { fetchAdminData } = useAdminContext();
  const { fetchPatientData } = usePatientContext();
  const {
    fetchDoctorData,
    fetchAppontmentsByDoctor,
    fetchAllAppontmentsByDoctor,
    fetchDoctorsWithSpec,
  } = useDoctorContext();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [specializations, setSpecializations] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const [navigation, setNavigation] = useState([]);
  const [isVerified, setIsVerified] = useState(true);
  const [doctorsByRating, setDoctorsByRating] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [userData, setUserData] = useState({});

  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  const getUserData = async () => {
    const response = await myAxios.get("/api/user-data");
    setUserData(response.data);
  };

  //bejelentkezett felhasználó adatainak lekérdezése
  const getUser = async () => {
    const response = await myAxios.get("/api/user");
    setUser(response.data);
    sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
    if (response.data.role_id !== 4) {
      getUserData();
    } else {
      navigate("/disabled-user");
    }
  };

  const fetchNavigation = async () => {
    try {
      const navData = await myAxios.get("/api/nav-items");
      setNavigation(navData.data); // A navigációs adatok beállítása
    } catch (error) {
      console.error("Hiba a navigációs adatok lekérésekor:", error);
    }
  };

  const fetchSpecializations = async () => {
    try {
      const response = await myAxios.get("/api/specializations");
      setSpecializations(response.data); // A navigációs adatok beállítása
    } catch (error) {
      setErrors("Hiba a navigációs adatok lekérésekor:", error);
    }
  };

  const logout = async () => {
    try {
      await csrf(); // CSRF cookie lekérése

      // Kijelentkezés az API-ból
      await myAxios.post("/logout");
      setUser(null);
      sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
      setNavigation([]);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const login = async ({ ...adat }) => {
    await csrf();

    try {
      const response = await myAxios.post("/login", adat);
      await getUser();
      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const fetchAVGDoctorsRatings = async () => {
    const response = await myAxios.get("/api/get-avg-ratings-by-doctors");
    setDoctorsByRating(response.data);
  };

  const reg = async ({ ...adat }) => {
    await csrf();
    console.log(adat);

    try {
      await myAxios.post("/register", adat);
      await getUser();
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const fetchEmailStatus = async () => {
    try {
      const response = await myAxios.get("/api/user/email-status");
      setIsVerified(response.data.email_verified);
    } catch (error) {
      console.error("Email verification check failed:", error);
    }
  };

  const checkDoctorLicence = async (licence) => {
    try {
      const response = await myAxios.get(`/api/checkLicenceById/${licence}`);
      return response.data;
    } catch (error) {
      setErrors("Licence check failed:", error);
    }
  };

  const fetchUploadProfilePicture = async () => {
    await myAxios.get("/api/file-upload");
  };

  const fetchHandleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Válassz ki egy képet!");
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

    try {
      const response = await myAxios.post("/api/file-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadMessage(response.data.message);
      setPreview(response.data.url); // Frissíti a profilképet az új URL-re
    } catch (error) {
      setUploadMessage("Feltöltés sikertelen!");
      console.error(error);
    }
  };

  useEffect(() => {
    const storedIsLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
    if (storedIsLoggedIn) {
      getUser().then(() => fetchEmailStatus());
    }
  }, []);

  useEffect(() => {
    if (user && !isVerified) {
      navigate("/verify-email");
    }
  }, [isVerified]);

  useEffect(() => {
    if (user && user.role_id <= 3 && isVerified) {
      fetchPatientData();
      fetchDoctorsWithSpec();
      fetchNavigation();
      if (user && user.role_id <= 2 && isVerified) {
        fetchDoctorData();
        fetchAppontmentsByDoctor(user.id);
        fetchAllAppontmentsByDoctor(user.id);
        if (user && user.role_id === 1 && isVerified) {
          fetchAdminData();
        }
      }
    } else if (user && !isVerified) {
      navigate("/verify-email");
    } else if (user && user.role_id === 4) {
      navigate("/disabled-user");
    } else {
      fetchNavigation();
      fetchAVGDoctorsRatings();
      fetchDoctorsWithSpec();
    }
  }, [user]);

  const changeUserInfo = async (id, formData) => {
    await myAxios.put(`/api/change-user-info/${id}`, formData);
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        login,
        getUser,
        reg,
        errors,
        user,
        navigation,
        fetchNavigation,
        isVerified,
        fetchEmailStatus,
        fetchSpecializations,
        doctorsByRating,
        specializations,
        setSpecializations,
        checkDoctorLicence,
        fetchUploadProfilePicture,
        userData,
        setSelectedFile,
        uploadMessage,
        preview,
        setPreview,
        fetchHandleUpload,
        getUserData,
        changeUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuthContext() {
  return useContext(AuthContext);
}
