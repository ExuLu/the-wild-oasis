import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import Account from './pages/Account';
import Booking from './pages/Booking';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Checkin from './pages/Checkin';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';

import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';

import { DarkModeProvider } from './context/DarkModeContext';

import GlobalStyles from './styles/GlobalStyles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route element={<Navigate replace to='dashboard' />} index />
              <Route element={<Dashboard />} path='dashboard' />
              <Route element={<Booking />} path='bookings/:bookingId' />
              <Route element={<Checkin />} path='checkin/:bookingId' />
              <Route element={<Bookings />} path='bookings' />
              <Route element={<Cabins />} path='cabins' />
              <Route element={<Users />} path='users' />
              <Route element={<Settings />} path='settings' />
              <Route element={<Account />} path='account' />
            </Route>
            <Route element={<Login />} path='login' />
            <Route element={<PageNotFound />} path='*' />
          </Routes>
        </BrowserRouter>
        <Toaster
          containerStyle={{ margin: '8px' }}
          gutter={12}
          position='top-center'
          toastOptions={{
            error: { duration: 5000 },
            style: {
              backgroundColor: 'var(--color-grey-zero)',
              color: 'var(--color-grey-700)',
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
            },
            success: { duration: 3000 },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

export default App;
