
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}> {/* Wrap with Provider */}
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);