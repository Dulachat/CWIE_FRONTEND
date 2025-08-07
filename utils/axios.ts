import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    maxContentLength:500000,
    maxBodyLength:Infinity
  });
export default axiosInstance