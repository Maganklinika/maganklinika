import axios from "axios";

const PRIMARY_BASE_URL = process.env.REACT_APP_PRIMARY_API_URL || "http://localhost:8000";
const SECONDARY_BASE_URL = "http://localhost";

// Axios példány létrehozása
export const myAxios = axios.create({
  baseURL: PRIMARY_BASE_URL,
  withCredentials: true,
});

// Kérések interceptorai
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

// Hibakezelő interceptor
myAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Response error:", error.response);
    }
    return Promise.reject(error);
  }
);
