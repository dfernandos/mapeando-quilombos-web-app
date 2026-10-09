import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://mapeando-quilombos-bd19da87b2f3.herokuapp.com/api/territory-svc",
});

export default api;