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

const router = createBrowserRouter([

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

    ],
  },

]);

export default router;