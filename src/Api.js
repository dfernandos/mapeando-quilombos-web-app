import axios from "axios";

const api = axios.create({
  baseURL: "https://territory-svc-production.up.railway.app/api/territory-svc",
});

export default api;