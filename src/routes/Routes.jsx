import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import DashboardLayout from "../layouts/DashboardLayout";

import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import AllContests from "../pages/AllContests";
import Leaderboard from "../pages/Leaderboard";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import ContestDetails from "../pages/ContestDetails";

import AddContest from "../pages/dashboard/AddContest";
import MyCreatedContests from "../pages/dashboard/MyCreatedContests";
import ManageContests from "../pages/dashboard/ManageContests";
import MyParticipatedContests from "../pages/dashboard/MyParticipatedContests";
import MyWinningContests from "../pages/dashboard/MyWinningContests";
import AdminRoute from "./AdminRoute";

import CreatorRoute from "./CreatorRoute";
const router = createBrowserRouter([

  // MAIN WEBSITE ROUTES
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
        path: "/all-contests",

        element: <AllContests />,
      },

      {
        path: "/leaderboard",

        element: <Leaderboard />,
      },

      {
        path: "/about",

        element: <About />,
      },

      {
        path: "/login",

        element: <Login />,
      },

      {
        path: "/register",

        element: <Register />,
      },

      {
        path: "/contest/:id",

        element: (

          <PrivateRoute>

            <ContestDetails />

          </PrivateRoute>

        ),
      },


    ],
  },

  // DASHBOARD ROUTES
  {
    path: "/dashboard",

    element: (

      <PrivateRoute>

        <DashboardLayout />

      </PrivateRoute>

    ),

    children: [

      {
        path: "/dashboard/add-contest",

        element: (

          <CreatorRoute>

            <AddContest />

          </CreatorRoute>

        ),
      },
      {
        path: "/dashboard/my-contests",

        element: <MyCreatedContests />,
      },
      {
        path: "/dashboard/manage-contests",

        element: (

          <AdminRoute>

            <ManageContests />

          </AdminRoute>

        ),
      },
      {
        path: "/dashboard/participated-contests",

        element: <MyParticipatedContests />,
      },
      {
        path: "/dashboard/winning-contests",

        element: <MyWinningContests />,
      },

    ],
  },

]);

export default router;