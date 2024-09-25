import axios from "axios";

// the configuration for send the headers bearer token or the credenstion for every request Create an instance of axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default axiosInstance;
