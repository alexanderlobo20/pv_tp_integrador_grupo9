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

        {estado === 'carga' && <p>Cargando...</p>}
        {estado === 'error' && <p>Error al cargar clientes</p>}
        {estado === 'exito' && (
          <ul>
            {clientes.map((cliente) => (
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
