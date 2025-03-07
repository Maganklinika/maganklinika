import axios from "axios";

const PRIMARY_BASE_URL = "http://localhost:9000"; //"http://localhost:8000"
const SECONDARY_BASE_URL = "http://localhost:9000";

// Létrehozzuk az Axios példányt
export const myAxios = axios.create({
  baseURL: PRIMARY_BASE_URL,
  withCredentials: true,
});

myAxios.interceptors.response.use(
  (response) => response, // Ha nincs hiba, térjen vissza a válasszal
  async (error) => {
    if (
      !error.config._retry &&
      error.response &&
      error.response.status >= 500
    ) {
      error.config._retry = true; // Megjelöljük, hogy már próbáltuk újra
      console.warn(
        `Primary backend failed, retrying with secondary: ${SECONDARY_BASE_URL}`
      );
      error.config.baseURL = SECONDARY_BASE_URL; // Másodlagos backend beállítása
      return myAxios(error.config); // Újrapróbáljuk a kérést
    }
    return Promise.reject(error); // Ha más hiba, dobja vissza
  }
);

// Interceptorok hozzáadása
myAxios.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];
    if (token) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
    }
    const user = localStorage.getItem("user");
    // Ha van bejelentkezett felhasználó, állítsuk be az Authorization tokent
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.token) {
        config.headers["Authorization"] = `Bearer ${parsedUser.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

myAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Response error:", error.response);
    }
    return Promise.reject(error);
  }
);
