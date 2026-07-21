import axios from "axios";

const api = axios.create({
  baseURL: "https://lottery-backend2.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;