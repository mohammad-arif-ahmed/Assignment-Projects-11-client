
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home.jsx";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

// Admin Routes
import AdminProfile from "../pages/dashboard/AdminProfile";
import ManageUsers from "../pages/dashboard/ManageUsers";
import ManageContests from "../pages/dashboard/ManageContests";
// Creator Routes
import AddContest from "../pages/dashboard/AddContest";
import MyContests from "../pages/dashboard/MyContests";
import ContestSubmitted from "../pages/dashboard/ContestSubmitted";
// Contestant Routes
import MyParticipations from "../pages/dashboard/MyParticipations";
import WinningContests from "../pages/dashboard/WinningContests";
import ContestantProfile from "../pages/dashboard/ContestantProfile";


export const router = createBrowserRouter([
    // --- Public & Main Routes ---
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            
        ],
    },
    
    // --- Dashboard Route Setup ---
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            
            // 1. Admin Routes (AdminProfile is often used as the default dashboard view)
            {
                path: "admin-profile",
                element: <AdminProfile />,
            },
            {
                path: "manage-users",
                element: <ManageUsers />,
            },
            {
                path: "manage-contests",
                element: <ManageContests />,
            },
            
            // 2. Creator Routes
            {
                path: "add-contest",
                element: <AddContest />,
            },
            {
                path: "my-contests",
                element: <MyContests />,
            },
            {
                path: "contest-submitted",
                element: <ContestSubmitted />,
            },
            
            // 3. Contestant Routes
            {
                path: "my-participations",
                element: <MyParticipations />,
            },
            {
                path: "winning-contests",
                element: <WinningContests />,
            },
            {
                // Note: We use 'profile' as a general path for contestants
                path: "profile", 
                element: <ContestantProfile />,
            },
            
            
        ],
    },
]);