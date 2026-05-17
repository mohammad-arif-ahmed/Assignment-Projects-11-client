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


// react query client
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

    ],
  },

]);


// render app
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