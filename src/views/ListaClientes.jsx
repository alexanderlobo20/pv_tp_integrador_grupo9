import { useState } from 'react';
import Button from '@mui/material/Button';
import FormularioCliente from '../components/common/FormularioCliente';
import Dialog from '@mui/material/Dialog';
import { useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ListaClientes() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleSend = (datos) => setClientes([...clientes, datos]);
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
      <Container>
        <Typography
          variant='h4'
          sx={{ mt: 2 }}
        >
          Lista de Clientes
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <TextField
            label='Buscar por apellido o ciudad'
            variant='outlined'
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            sx={{ m: 2, width: '75%' }}
          />
          <Button
            variant='contained'
            onClick={handleOpen}
            startIcon={<PersonAddIcon />}
            size='large'
            sx={{ m: 2, width: '25%' }}
          >
            {/* Ingresar nuevo Cliente */}
          </Button>

          <Dialog
            open={mostrarFormulario}
            onClose={handleClose}
            maxWidth='md'
            fullWidth
            PaperProps={{ sx: { borderRadius: 4 } }}
          >
           <FormularioCliente
              onAlta={handleSend}
              onCerrar={handleClose}
              onSuccess={handleClose}
            />
          </Dialog>
        </Box>
      </Container>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {estado === 'carga' && (
            <Typography style={{ color: '#aaa', marginTop: 10 }}>
              <CircularProgress />
              Cargando clientes...
            </Typography>
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
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 1,
                            justifyContent: 'center',
                          }}
                        >
                          <Button
                            variant='contained'
                            startIcon={<EditIcon />}
                            color='warning'
                          ></Button>
                          <Button
                            variant='contained'
                            startIcon={<DeleteIcon />}
                            color='error'
                          ></Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Container>
    </>
  );
}

export default ListaClientes;
