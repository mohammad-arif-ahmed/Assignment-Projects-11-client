
import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// 1. Create the Axios Secure instance
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', 
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // 2. Add Request Interceptor: Attach JWT token to every outgoing request
        axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('access-token');
            // If token exists, attach it to the Authorization header
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // 3. Add Response Interceptor: Handle 401 (Unauthorized) or 403 (Forbidden) errors
        axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async (error) => {
            const status = error.response.status;
            
            // If status is 401 or 403, log the user out and redirect to login
            if (status === 401 || status === 403) {
                await logOut();
                toast.error("Session expired or unauthorized. Please log in again.");
                navigate('/login');
            }
            return Promise.reject(error);
        });
        
    // Dependency array ensures interceptors are setup only once or when logOut/navigate changes
    }, [logOut, navigate]); 

    return axiosSecure;
};

export default useAxiosSecure;