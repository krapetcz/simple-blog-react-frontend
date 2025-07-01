import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api",
});

// ⬇️ REQUEST INTERCEPTOR – přidá token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⬇️ RESPONSE INTERCEPTOR – chytá chyby
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Volitelně: zkontroluj text odpovědi
      const msg = error.response.data?.msg || error.response.data?.error;

      if (msg && msg.toLowerCase().includes("token has expired")) {
        console.warn("⚠️ Token vypršel, odhlašuji...");
        localStorage.removeItem("token");
        window.location.href = "/login"; // nebo navigate("/login") v komponentě
      }
    }

    return Promise.reject(error);
  }
);

export default api;
