import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

function ClienteCard({ cliente }) {
  const { id, name, address } = cliente;

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
