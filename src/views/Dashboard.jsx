import { useAdmin } from "../context/AdminContext";
import ListaClientes from "./ListaClientes";

export default function Dashboard() {
  const { admin } = useAdmin();

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <hr />
      
      <div>
        <h2>Bienvenido al sistema</h2>

        {admin ? (
          <div>
            <p>
              <strong>Administrador:</strong> {admin.name}
            </p>
            <p>
              <strong>Sector:</strong> {admin.sector}
            </p>
          </div>
        ) : (
          <p>No hay administrador logueado</p>
        )}
      </div>

      <hr />
      <ListaClientes />
    </div>
  );
}
