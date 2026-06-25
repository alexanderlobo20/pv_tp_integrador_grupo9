import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
      <h3>Panel Clientes</h3>

      {admin ? (
        <div>
          <span>
            {admin.name} ({admin.sector})
          </span>

          <button onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <span>No logueado</span>
      )}
    </header>
  );
}