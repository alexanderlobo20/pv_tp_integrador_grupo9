import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import {
  Box, Button, Card, CardContent, Container, FormControl, InputAdornment,
  InputLabel, MenuItem, Select, TextField, Typography
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function Login() {
  const { login } = useAdmin();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [sector, setSector] = useState("Soporte");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      setError("El nombre es obligatorio");
      return;
    }

    if (name.length > 15) {
      setError("El nombre no puede contener más de 15 caracteres");
      return;
    }

    setError("");
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
        background: "linear-gradient(135deg, #034c95 0%, #015bb4 100%)",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={12} sx={{ borderRadius: 4 }}>
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
                sx={{ fontSize: 70, mb: 2 }}
              />

              <Typography variant="h4" fontWeight="bold">
                Iniciar sesión
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Ingresá tus datos para continuar
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nombre"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                margin="normal"
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              {error && (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{ mt: 1, ml: 1 }}
                >
                  {error}
                </Typography>
              )}

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