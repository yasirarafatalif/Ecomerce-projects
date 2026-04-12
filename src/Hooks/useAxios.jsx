import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  // baseURL: "https://ecommrecebackend.vercel.app",
  withCredentials: true
});

const useAxios = () => {
  return axiosSecure; 
};

export default useAxios;



