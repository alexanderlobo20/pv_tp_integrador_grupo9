import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Chip, Paper } from "@mui/material";

export default function Header() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,

        height: { xs: "auto", sm: 72 },
        minHeight: { xs: 64, sm: 72 },

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        flexWrap: "wrap",

        p: 2,
        borderRadius: 0,
        background: "linear-gradient(90deg, #1976d2, #42a5f5)",
        color: "white",
      }}
    >
      {/* izq */}
      <Typography variant="h6" fontWeight={700}>
        Panel Clientes
      </Typography>

      {/* der */}
      {admin ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Chip
            label={`${admin.name} (${admin.sector})`}
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: 500,
            }}
          />

          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </Box>
      ) : (
        <Typography>
          No logueado
        </Typography>
      )}
    </Paper>
  );
}