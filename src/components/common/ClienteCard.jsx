import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { useState } from 'react';

function ClienteCard({ cliente, onEliminar }) {
  const { id, name, address } = cliente;
  const { admin } = useAdmin();
  const navigate = useNavigate();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  return (
    <Grid key={id}>
      <Card variant="outlined" sx={{ boxShadow: 1, mb: 1 }}>
        <CardContent>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

            <Box>
              <Typography variant="h5">
                {name.firstname} {name.lastname}
              </Typography>
              <Typography>{address.city}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>

              <Tooltip title="Ver detalle">
                <IconButton
                  color="primary"
                  onClick={() =>
                    navigate(`/clientes/${id}`, { state: { cliente } })
                  }
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>

              {admin?.sector === "Gerencia" && (
                <Tooltip title="Eliminar cliente">
                  <IconButton
                    color="error"
                    onClick={() => setOpenConfirm(true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}

            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={openConfirm}
        onClose={() => {
          if (!loadingDelete) setOpenConfirm(false);
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Eliminar cliente</DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">
            ¿Seguro que deseas eliminar este cliente?
          </Typography>
        </DialogContent>

        <DialogActions>

          <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>

            <button
              onClick={() => setOpenConfirm(false)}
              disabled={loadingDelete}
              style={{ flex: 1 }}
            >
              Cancelar
            </button>

            <button
              style={{ flex: 1 }}
              disabled={loadingDelete}
              onClick={() => {
                setLoadingDelete(true);

                onEliminar(id);

                setLoadingDelete(false);
                setOpenConfirm(false);
              }}
            >
              {loadingDelete ? (
                <CircularProgress size={18} />
              ) : (
                "Eliminar"
              )}
            </button>

          </Box>

        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default ClienteCard;
