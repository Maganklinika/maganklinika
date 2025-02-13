import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/Axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [navigation, setNavigation] = useState([]);
  const [isVerified, setIsVerified] = useState(true);
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
    console.log(data);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
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
      localStorage.removeItem("user");
      setUser(null);
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

    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
    navigate("/");
  };

  const reg = async ({ ...adat }) => {
    await csrf();
    console.log(adat);

    try {
      const response = await myAxios.post("/register", adat);
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
    const savedUser = localStorage.getItem("user");
    setUser(JSON.parse(savedUser));
    if (user) {
      if (!isVerified) {
        navigate("/verify-email");
      }
    }
  }, []); // Csak egyszer fut le, amikor az oldal betöltődik

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuthContext() {
  return useContext(AuthContext);
}
