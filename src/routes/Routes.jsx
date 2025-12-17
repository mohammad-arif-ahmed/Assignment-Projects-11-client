import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home.jsx";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import AdminStats from "../pages/dashboard/AdminDashboard/AdminStats"; // AdminStats Component
import AdminContestReview from "../pages/dashboard/AdminDashboard/AdminContestReview"; // Pending Contests Component

import ManageUsers from "../pages/dashboard/ManageUsers";
import ManageContests from "../pages/dashboard/ManageContests";

// Creator
import AddContest from "../pages/dashboard/AddContest";
import MyContests from "../pages/dashboard/MyContests";
import ContestSubmitted from "../pages/dashboard/ContestSubmitted.jsx";
import UpdateContest from '../pages/dashboard/UpdateContest';
import ContestSubmissions from "../pages/dashboard/ContestSubmissions.jsx";

// Contestant
import MyParticipations from "../pages/dashboard/MyParticipations";
import WinningContests from "../pages/dashboard/WinningContests";
import ContestantProfile from "../pages/dashboard/ContestantProfile";
import MyParticipatedContests from "../pages/dashboard/Contestant/MyParticipatedContests.jsx";
import MyWinningContests from "../pages/dashboard/Contestant/MyWinningContests.jsx";
import MyProfile from "../pages/dashboard/Common/MyProfile.jsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ],
    },

    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [

            // --------------------- 1. Admin Routes ---------------------
            {
                path: "admin-stats",
                element: <AdminStats />,
            },
            {
                path: "contest-review",
                element: <AdminContestReview />,
            },
            {
                path: "manage-users",
                element: <ManageUsers />,
            },

            // --------------------- 2. Creator Routes ---------------------
            {
                path: "add-contest",
                element: <AddContest />,
            },
            {
                path: "my-created-contests",
                element: <MyContests />,
            },
            {
                path: "contest-submitted",
                element: <ContestSubmitted />,
            },
            {
                path: "contest-submissions",
                element: <ContestSubmissions />
            },
            {
                path: "update-contest/:id",
                element: <UpdateContest />,
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
            {
                path: "my-participated",
                element: <MyParticipatedContests />,
            },
            {
                path: "my-winning",
                element: <MyWinningContests />,
            },
            {
                path: "my-profile",
                element: <MyProfile />,
            }


        ],
    },
]);