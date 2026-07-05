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
  Paper
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import ClienteCard from '../components/common/ClienteCard';
import { useAdmin } from "../context/AdminContext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function ListaClientes() {
  const { admin } = useAdmin();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleSend = (datos) => setClientes([...clientes, datos]);
  const handleOpen = () => setMostrarFormulario(true);
  const handleClose = () => setMostrarFormulario(false);

  const [clientes, setClientes] = useState([]);
  const [estado, setEstado] = useState('');

  const [buscar, setBuscar] = useState('');

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
const eliminarCliente = async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error();
    }

    setClientes((prev) => prev.filter((cliente) => cliente.id !== id));

    setTipoMensaje('success');
    setMensaje('Cliente eliminado');
    setOpenSnackbar(true);
  } catch (error) {
    setTipoMensaje('error');
    setMensaje('No fue posible eliminar el cliente.');
    setOpenSnackbar(true);
  }
};

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
      <Box sx={{ minHeight: "100vh", background: "#f5f5f5", py: 4 }}>
        <Container>
            <Paper sx={{ p: 4, mb: 3, borderRadius: 3, color: "white", background: "linear-gradient(135deg, #034c95 0%, #015bb4 60%, #0284c7 100%)" }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Lista de clientes
          </Typography>
        </Paper>

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
                  onEliminar={eliminarCliente}
                />
              ))}
            </Grid>
          </Box>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity={tipoMensaje}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {mensaje}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </>
  );
}

export default ListaClientes;
