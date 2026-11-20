import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AuthGuard from './components/auth/AuthGuard';
import HomePage from './pages/HomePage';
import CasesPage from './pages/CasesPage';
import CaseOpenPage from './pages/CaseOpenPage';
import MarketPage from './pages/MarketPage';
import InventoryPage from './pages/InventoryPage';
import ProfilePage from './pages/ProfilePage';
import DepositPage from './pages/DepositPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'cases', element: <CasesPage /> },
      {
        path: 'cases/:id',
        element: (
          <AuthGuard>
            <CaseOpenPage />
          </AuthGuard>
        ),
      },
      { path: 'market', element: <MarketPage /> },
      {
        path: 'inventory',
        element: (
          <AuthGuard>
            <InventoryPage />
          </AuthGuard>
        ),
      },
      {
        path: 'profile',
        element: (
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        ),
      },
      {
        path: 'deposit',
        element: (
          <AuthGuard>
            <DepositPage />
          </AuthGuard>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
]);
