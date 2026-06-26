import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import Header from './components/layout/Header';
import ListaClientes from './views/ListaClientes';

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path='/login'
          element={<Login />}
        />

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/clientes'
          element={<ListaClientes />}
        />

        <Route
          path='*'
          element={<Navigate to='/' />}
        />
      </Routes>
    </>
  );
}
