import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import Header from './components/layout/Header';
import ListaClientes from './views/ListaClientes';

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route
        path='/'
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Dashboard />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/clientes'
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <ListaClientes />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
