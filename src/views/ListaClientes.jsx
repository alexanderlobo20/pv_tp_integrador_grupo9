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
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import ClienteCard from '../components/common/ClienteCard';

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
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, my: 2 }}>
          <TextField
            label='Buscar por apellido o ciudad'
            variant='outlined'
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            sx={{ width: '75%' }}
          />
          <Button
            variant='contained'
            onClick={handleOpen}
            size='large'
            sx={{ width: '25%' }}
          >
            <PersonAddIcon />
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
        {/* </Container>
      <Container> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {estado === 'carga' && (
            <Typography style={{ color: '#aaa' }}>
              <CircularProgress />
              Cargando clientes...
            </Typography>
          )}
        </Box>

        {estado === 'error' && <p>Error al cargar clientes</p>}

        {/* tabla de clientes - pantallas pequeñas */}
        <Box
          /* sx={{ display: { xs: 'block', md: 'none' } }} */
          style={{ marginBottom: 15 }}
        >
          <Grid>
            {clientesFiltrados.map((cliente) => (
              <ClienteCard
                key={cliente.id}
                cliente={cliente}
              />
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default ListaClientes;
