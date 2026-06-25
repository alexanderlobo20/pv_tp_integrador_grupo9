import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function Login() {
  const { login } = useAdmin();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [sector, setSector] = useState("Soporte");

  const handleSubmit = (e) => {
    e.preventDefault();
     if (name.trim() === "") {
      alert("El nombre del administrador es obligatorio");
      return;
    }
    login(name, sector);
    navigate("/");
  };

  return (
    <div>
      <h2>Login Admin</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
        >
          <option value="Soporte">Soporte</option>
          <option value="Gerencia">Gerencia</option>
        </select>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}