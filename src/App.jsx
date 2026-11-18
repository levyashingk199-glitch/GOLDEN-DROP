import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#16162e',
              color: '#fff',
              border: '1px solid #252547',
              borderRadius: '1rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            },
            success: {
              iconTheme: {
                primary: '#36D399',
                secondary: '#0f0f23',
              },
            },
            error: {
              iconTheme: {
                primary: '#EB4B4B',
                secondary: '#0f0f23',
              },
            },
          }}
        />
      </QueryClientProvider>
    </HelmetProvider>
  );
}
