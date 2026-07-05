import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

function ClienteCard({ cliente, onEliminar }) {
  const { id, name, address } = cliente;
  const navigate = useNavigate();
  const { admin } = useAdmin();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  return (
    <Grid>
      <Card
        variant="outlined"
        sx={{ boxShadow: 1, mb: 1 }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                variant="h5"
                component="div"
              >
                {name.firstname} {name.lastname}
              </Typography>

              <Typography>{address.city}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
              }}
            >
              <Tooltip title="Ver detalle" arrow>
                <IconButton
                  color="primary"
                  onClick={() =>
                    navigate(`/clientes/${id}`, {
                      state: { cliente },
                    })
                  }
                >
                  <VisibilityIcon
                    sx={{
                      fontSize: {
                        xs: 28,
                        md: 36
                      }
                    }} 
                  />
                </IconButton>
              </Tooltip>    

              {admin?.sector === "Gerencia" && (
                <Tooltip title="Eliminar cliente" arrow>
                  <IconButton
                    color="error"
                    onClick={() => setOpenConfirm(true)}
                  >
                    <DeleteIcon
                      sx={{
                        fontSize: {
                          xs: 28,
                          md: 36
                        }
                      }}
                    />
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
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              p: 0.5,
              width: "100%",
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: { xs: 18, sm: 20 } }}>
          Eliminar cliente
        </DialogTitle>

        <DialogContent>
          <Typography
            color="text.secondary"
            sx={{ fontSize: { xs: 14, sm: 16 } }}
          >
            ¿Estás seguro de que deseas eliminar este cliente?
          </Typography>
        </DialogContent>

        <DialogActions
        sx={{
          padding: { xs: 1.5, sm: 2 },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
        }}
      >
          <Button
            fullWidth
            onClick={() => setOpenConfirm(false)}
            disabled={loadingDelete}
            variant="contained"
            sx={{
              backgroundColor: "#015bb4",
              color: "white",
              "&:hover": {
                backgroundColor: "#034c95",
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            fullWidth
            onClick={() => {
              setLoadingDelete(true);

              setTimeout(() => {
                onEliminar(id);
                setLoadingDelete(false);
                setOpenConfirm(false);
              }, 500);
            }}
            sx={{
              marginRight: { xs:  1, sm: 0 }
            }}
            variant="contained"
            color="error"
            disabled={loadingDelete}
            startIcon={
              loadingDelete ? (
                <CircularProgress size={18} color="inherit" />
              ) : null
            }
          >
            {loadingDelete ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default ClienteCard;
