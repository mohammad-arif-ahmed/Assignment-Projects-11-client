import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home.jsx";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

// ----------------- 🔑 অ্যাডমিন ড্যাশবোর্ড কম্পোনেন্ট (আপনার নতুন ফাইল) -----------------
import AdminStats from "../pages/dashboard/AdminDashboard/AdminStats"; // AdminStats Component
import AdminContestReview from "../pages/dashboard/AdminDashboard/AdminContestReview"; // Pending Contests Component

// ----------------- আপনার অন্যান্য কম্পোনেন্ট (আগের রুটিং থেকে নাম নেওয়া) -----------------
// Admin (যদি AdminStats বা Review ব্যবহার না করেন, তবে এগুলো দরকার)
// import AdminProfile from "../pages/dashboard/AdminProfile"; 
import ManageUsers from "../pages/dashboard/ManageUsers"; 
import ManageContests from "../pages/dashboard/ManageContests"; 

// Creator
import AddContest from "../pages/dashboard/AddContest";
import MyContests from "../pages/dashboard/MyContests";
import ContestSubmitted from "../pages/dashboard/ContestSubmitted";

// Contestant
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
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            // 💡 অন্যান্য পাবলিক রুট
        ],
    },
    
    // --- Dashboard Route Setup ---
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            
            // --------------------- 1. Admin Routes ---------------------
            {
                // Admin Dashboard Overview (যেখানে stats দেখাবে)
                path: "admin-stats", 
                element: <AdminStats />, // 🔑 নতুন AdminStats কম্পোনেন্ট
            },
            {
                // Manage Contests (পেন্ডিং কন্টেস্ট রিভিউ করার জন্য)
                path: "contest-review", 
                element: <AdminContestReview />, // 🔑 নতুন AdminContestReview কম্পোনেন্ট
            },
            {
                // Manage Users (আগের কম্পোনেন্ট)
                path: "manage-users",
                element: <ManageUsers />,
            },
            
            // --------------------- 2. Creator Routes ---------------------
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
            
            // --------------------- 3. Contestant Routes ---------------------
            {
                path: "my-participations",
                element: <MyParticipations />,
            },
            {
                path: "winning-contests",
                element: <WinningContests />,
            },
            {
                path: "profile", 
                element: <ContestantProfile />,
            },
            
            // 💡 default/root dashboard view (প্রোফাইল বা অন্য কিছু)
            // { path: "", element: <AdminStats /> }, // Optionally set a default page
        ],
    },
]);