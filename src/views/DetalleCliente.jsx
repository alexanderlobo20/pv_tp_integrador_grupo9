import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  Avatar,
  Typography,
  CardContent,
  Divider,
  Grid,
  Button,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';

function DetalleCliente() {
  const { id } = useParams();
  const location = useLocation();

  const cliente = location.state?.cliente;

  console.log(cliente);

  return (
    <Box sx={{ flexGrow: 1, p: 3, display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{ maxWidth: 600, width: '100%', borderRadius: 3, boxShadow: 3 }}
      >
        {/* Avatar y Nombre */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
          }}
        >
          <Avatar
            sx={{ width: 100, height: 100, mb: 2, border: '3px solid white' }}
          />
          <Typography
            variant='h5'
            component='h1'
            fontWeight='bold'
          >
            {cliente.name.firstname} {cliente.name.lastname}
          </Typography>
        </Box>

        {/* Contenido de la Tarjeta */}
        <CardContent sx={{ px: 4, py: 3 }}>
          {/* Biografía */}
          <Typography
            variant='body1'
            color='text.secondary'
            align='center'
            sx={{ mb: 3, fontStyle: 'italic' }}
          >
            Información de contacto
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Datos Personales Estructurados */}
          <Grid
            container
            spacing={2}
          >
            {/* Ubicación */}
            <Grid
              size={12}
              display='flex'
              alignItems='center'
              gap={1.5}
            >
              <LocationIcon color='action' />
              <Typography
                variant='caption'
                color='text.secondary'
                display='block'
                sx={{ fontWeight: 600, marginLeft: 1 }}
              >
                Ubicación
              </Typography>
              <Box>
                <Typography variant='body1'>
                  {cliente.address.city}, {cliente.address.street},{' '}
                  {cliente.address.number}
                </Typography>
              </Box>
            </Grid>

            {/* Correo */}
            <Grid
              size={12}
              display='flex'
              alignItems='center'
              gap={1.5}
            >
              <EmailIcon color='action' />
              <Typography
                variant='caption'
                color='text.secondary'
                display='block'
                sx={{ fontWeight: 600, marginLeft: 1 }}
              >
                Correo Electrónico
              </Typography>
              <Box>
                <Typography variant='body1'>{cliente.email}</Typography>
              </Box>
            </Grid>

            {/* Teléfono */}
            <Grid
              size={12}
              display='flex'
              alignItems='center'
              gap={1.5}
            >
              <PhoneIcon color='action' />
              <Typography
                variant='caption'
                color='text.secondary'
                display='block'
                sx={{ fontWeight: 600, marginLeft: 1 }}
              >
                Teléfono
              </Typography>
              <Box>
                <Typography variant='body1'>{cliente.phone}</Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Botón de Acción */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant='contained'
              startIcon={<EditIcon />}
              onClick={() => alert('Abrir modal de edición')}
            >
              Editar Perfil
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DetalleCliente;
