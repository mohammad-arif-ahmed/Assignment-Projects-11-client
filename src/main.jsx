import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import AuthProvider from './providers/AuthProvider';

import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';

import Login from './pages/Login';

import Register from './pages/Register';

import PrivateRoute from './routes/PrivateRoute';


// query client
const queryClient = new QueryClient();


// router
const router = createBrowserRouter([

  {
    path: "/",

    element: <MainLayout />,

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

      {
        path: "/dashboard",

        element: (
          <PrivateRoute>

            <h1 className="text-5xl py-20">
              Dashboard
            </h1>

          </PrivateRoute>
        ),
      },

    ],
  },

]);


// render
ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <QueryClientProvider client={queryClient}>

      <AuthProvider>

        <RouterProvider router={router} />

      </AuthProvider>

    </QueryClientProvider>

  </React.StrictMode>

);