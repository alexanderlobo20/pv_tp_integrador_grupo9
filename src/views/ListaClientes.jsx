import { useState } from 'react';
import Button from '@mui/material/Button';
import FormularioCliente from '../components/common/FormularioCliente';
import { useClientes } from '../context/ClientesContext';
import Dialog from '@mui/material/Dialog';
import {
  Box,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ClienteCard from '../components/common/ClienteCard';

function ListaClientes() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const { clientes, estado, agregarCliente, eliminarCliente } = useClientes();

  const handleOpen = () => setMostrarFormulario(true);
  const handleClose = () => setMostrarFormulario(false);

  const [buscar, setBuscar] = useState('');

  const clientesFiltrados = clientes.filter((cliente) => {
    const apellido = cliente.name?.lastname?.toLowerCase() || '';
    const ciudad = cliente.address?.city?.toLowerCase() || '';
    const query = buscar.toLowerCase();

    return apellido.includes(query) || ciudad.includes(query);
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f5f5f5',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 4,
            mb: 3,
            borderRadius: 3,
            color: 'white',
            background:
              'linear-gradient(135deg, #034c95 0%, #015bb4 60%, #0284c7 100%)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Lista de Clientes
          </Typography>
        </Paper>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            label="Buscar por apellido o ciudad"
            variant="outlined"
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              minWidth: 70,
            }}
          >
            <PersonAddIcon />
          </Button>
        </Box>

        <Dialog
          open={mostrarFormulario}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: { borderRadius: 4} }}
        >
          <FormularioCliente
            onAlta={agregarCliente}
            onCerrar={handleClose}
            onSuccess={handleClose}
          />
        </Dialog>

        {estado === 'carga' && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 5,
              gap: 2,
            }}
          >
            <CircularProgress />
            <Typography>Cargando clientes...</Typography>
          </Box>
        )}

        {estado === 'error' && (
          <Typography color="error" align="center">
            Error al cargar clientes
          </Typography>
        )}

        {estado === 'exito' && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              pb: 3,
            }}
          >
            {clientesFiltrados.map((cliente) => (
              <ClienteCard
                key={cliente.id}
                cliente={cliente}
                onEliminar={eliminarCliente}
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default ListaClientes;

