import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { Box,Button,Card,CardContent,Container,FormControl,InputAdornment,InputLabel,MenuItem,Select,TextField,Typography} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function Login() {
  const { login } = useAdmin();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [sector, setSector] = useState("Soporte");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      alert("El nombre del administrador es obligatorio");
      return;
    }

    login(name, sector);
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={12}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 5,
              }}
            >
              <AdminPanelSettingsIcon
                color="primary"
                sx={{
                  fontSize: 70,
                  mb: 2,
                }}
              />

              <Typography variant="h4" fontWeight="bold">
                Login Admin
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Ingresá tus datos para continuar
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>Sector</InputLabel>
                <Select
                  value={sector}
                  label="Sector"
                  onChange={(e) => setSector(e.target.value)}
                >
                  <MenuItem value="Soporte">Soporte</MenuItem>
                  <MenuItem value="Gerencia">Gerencia</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                }}
              >
                Ingresar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}