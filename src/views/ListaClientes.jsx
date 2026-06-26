import { useState } from 'react';
import Button from '@mui/material/Button';
import ModuloC from '../components/common/ModuloC';
import Dialog from '@mui/material/Dialog';
import { useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

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
        <Typography variant='h4'>Lista de Clientes</Typography>
        <TextField
          label='Buscar por apellido o ciudad'
          variant='outlined'
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          sx={{ m: 2 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {estado === 'carga' && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              {/* <Spinner
                animation='border'
                role='status'
              /> */}

              <p style={{ color: '#aaa', marginTop: 10 }}>
                Cargando clientes...
              </p>
            </div>
          )}
        </Box>

        {estado === 'error' && <p>Error al cargar clientes</p>}
        <Box>
          {estado === 'exito' && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Ciudad</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientesFiltrados.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell>{cliente.name.firstname}</TableCell>
                      <TableCell>{cliente.name.lastname}</TableCell>
                      <TableCell>{cliente.address.city}</TableCell>
                      <TableCell>{cliente.email}</TableCell>
                      <TableCell>{cliente.phone}</TableCell>
                      <TableCell>
                        <button>Editar</button>
                        <button>Eliminar</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </section>
    </>
  );
}

export default ListaClientes;
