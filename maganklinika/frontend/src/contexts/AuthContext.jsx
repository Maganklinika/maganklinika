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
  const { fetchDoctorData } = useDoctorContext();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [navigation, setNavigation] = useState([]);
  const [isVerified, setIsVerified] = useState(true);
  const [doctorsByRating, setDoctorsByRating] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  //bejelentkezett felhasználó adatainak lekérdezése
  const getUser = async () => {
    const { data } = await myAxios.get("/api/user");
    setUser(data);
    sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
  };

  const fetchNavigation = async () => {
    try {
      const navData = await myAxios.get("/api/nav-items");
      setNavigation(navData.data); // A navigációs adatok beállítása
    } catch (error) {
      console.error("Hiba a navigációs adatok lekérésekor:", error);
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
    //lekérjük a csrf tokent
    await csrf();

    try {
      const response = await myAxios.post("/login", adat);
      console.log("siker");
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

  useEffect(() => {
    const storedIsLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
    if (storedIsLoggedIn) {
      const checkUser = async () => {
        await getUser();
        await fetchEmailStatus();
      };
      checkUser();
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (!isVerified) {
        navigate("/verify-email");
      }
    }

    const verify = async () => {
      await fetchEmailStatus();
    };

    if (user) {
      verify();
    }

    if (user && user.role_id <= 3 && isVerified) {
      fetchPatientData();
      fetchNavigation();
      if (user && user.role_id <= 2 && isVerified) {
        fetchDoctorData();
        if (user && user.role_id === 1 && isVerified) {
          fetchAdminData();
        }
      }
    } else if (user && !isVerified) {
      navigate("/verify-email");
    } else {
      fetchNavigation();
      fetchAVGDoctorsRatings();
    }
  }, [user]); // Csak akkor fut le, ha a user változik

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
        doctorsByRating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuthContext() {
  return useContext(AuthContext);
}
