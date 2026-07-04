import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useNavigate } from 'react-router-dom';

function ClienteCard({ cliente }) {
  const { id, name, address } = cliente;

  const navigate = useNavigate();

  return (
    <Grid key={id}>
      <Card
        variant='outlined'
        sx={{ boxShadow: 1, mb: 1 }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                variant='h5'
                component='div'
              >
                {name.firstname} {name.lastname}
              </Typography>
              <Typography>{address.city}</Typography>
            </Box>
            <Box>
              <Button
                size='large'
                variant='contained'
                onClick={() =>
                  navigate(`/clientes/${id}`, { state: { cliente: cliente } })
                }
              >
                <VisibilityIcon />
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ClienteCard;
