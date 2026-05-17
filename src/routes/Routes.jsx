import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import AllContests from "../pages/AllContests";
import Leaderboard from "../pages/Leaderboard";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import ContestDetails from "../pages/ContestDetails";

const router = createBrowserRouter([

  {
    path: "/",

    element: <MainLayout />,

    errorElement: <ErrorPage />,

    children: [
      {
        path: "/dashboard",

        element: (

          <PrivateRoute>

            <h2 className="text-5xl text-center mt-20">

              Dashboard Private Page

            </h2>

          </PrivateRoute>

        ),

      },
      {
        path: "/contest/:id",

        element: (

          <PrivateRoute>

            <ContestDetails />

          </PrivateRoute>

        ),
      },

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

    ],
  },

]);

export default router;