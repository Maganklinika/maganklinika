import axios from "axios";

const PRIMARY_BASE_URL = process.env.REACT_APP_PRIMARY_API_URL || "http://localhost:8000";
const SECONDARY_BASE_URL = "http://localhost";

// Axios példány létrehozása
export const myAxios = axios.create({
  baseURL: PRIMARY_BASE_URL,
  withCredentials: true,
});

// Interceptorok
/*myAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes('/sanctum/csrf-cookie')) {
      console.warn(`⚠️ CSRF request failed on ${PRIMARY_BASE_URL}, trying secondary backend.`);

      originalRequest.baseURL = SECONDARY_BASE_URL;  // Átváltás a secondary backendre
      return myAxios(originalRequest);  // Újrapróbálkozás
    }

    // 🔴 Hálózati hiba esetén (`ERR_NETWORK`) ne ellenőrizzük a `response.status`-t, mert `response` nincs!
    if (
      !originalRequest._retry &&
      (error.code === "ERR_NETWORK" ||
        (error.response && error.response.status >= 400))
    ) {
      originalRequest._retry = true;

      console.warn(
        `⚠️ Primary backend failed (${PRIMARY_BASE_URL}), switching to secondary backend (${SECONDARY_BASE_URL})`
      );

      // 🔵 Ellenőrizzük, hogy a másodlagos szerver elérhető-e
      try {
        const secondaryCheck = await axios.get(SECONDARY_BASE_URL);
        if (secondaryCheck.status === 200) {
          console.warn(
            `✅ Switching to secondary backend: ${SECONDARY_BASE_URL}`
          );
          originalRequest.baseURL = SECONDARY_BASE_URL; // Új alap URL
          return myAxios(originalRequest); // Újrapróbálkozás
        }
      } catch (secondaryError) {
        console.error("❌ Secondary backend is also unreachable.");
        return Promise.reject(secondaryError);
      }
    }

    return Promise.reject(error);
  }
);*/

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
