import { useState } from 'react';
import Button from '@mui/material/Button';
import ModuloC from '../components/common/ModuloC';
import Dialog from '@mui/material/Dialog';
import { useEffect } from 'react';

function ListaClientes() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleOpen = () => setMostrarFormulario(true);
  const handleClose = () => setMostrarFormulario(false);

  const [clientes, setClientes] = useState([]);
  const [estado, setEstado] = useState('');

  const [buscar, setBuscar] = useState('');

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setEstado('carga');
        const response = await fetch('https://fakestoreapi.com/users');
        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: no se pudo obtener clientes`,
          );
        }
        const data = await response.json();
        setClientes(data);
        setEstado('exito');
      } catch (error) {
        setEstado('error');
      }
    };
    obtenerClientes();
  }, []);

  const clientesFiltrados = clientes.filter((cliente) => {
    const apellido = cliente.name.lastname.toLowerCase() || '';
    const ciudad = cliente.address.city.toLowerCase() || '';
    const query = buscar.toLowerCase();
    return apellido.includes(query) || ciudad.includes(query);
  });

  return (
    <>
      <Button
        variant='contained'
        onClick={handleOpen}
      >
        Ingresar nuevo Cliente
      </Button>

      <Dialog
        open={mostrarFormulario}
        onClose={handleClose}
        maxWidth='md'
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <ModuloC
          onCerrar={handleClose}
          onSuccess={handleClose}
        />
      </Dialog>

      <section>
        <h1>Lista de Clientes</h1>
        <input
          type='text'
          placeholder='Buscar apellido o ciudad...'
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
        />

        {estado === 'carga' && <p>Cargando...</p>}
        {estado === 'error' && <p>Error al cargar clientes</p>}
        {estado === 'exito' && (
          <ul>
            {clientesFiltrados.map((cliente) => (
              <li key={cliente.id}>
                <h2>
                  {cliente.name.firstname} {cliente.name.lastname}
                </h2>
                <p>{cliente.address.city}</p>
                <button>Editar</button>
                <button>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default ListaClientes;
