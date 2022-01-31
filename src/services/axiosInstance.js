import Axios from "axios";

const axiosInstance = Axios.create({
    // baseURL: "http://localhost:4000/",
    baseURL: "http://192.168.68.142:4000",
    withCredentials: true,
    "Content-Type": "application/json",
});
export default axiosInstance;
