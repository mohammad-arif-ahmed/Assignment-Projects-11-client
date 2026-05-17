import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AuthProvider from './providers/AuthProvider'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello ContestHub</h1>,
  },
]);

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <QueryClientProvider client={queryClient}>

      <AuthProvider>

        <RouterProvider router={router} />

      </AuthProvider>

    </QueryClientProvider>

  </React.StrictMode>,
)