import { useEffect, useMemo, useState, useRef } from "react";
import { useClientes } from '../context/ClientesContext';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Skeleton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import PeopleIcon from "@mui/icons-material/People";
import LocationCityIcon from "@mui/icons-material/LocationCity";

export default function Dashboard() {
  const navigate = useNavigate();
  const distribucionRef = useRef(null);

  const { clientes, estado } = useClientes();

  const loading = estado === "carga" || estado === "";

  const safeClientes = Array.isArray(clientes) ? clientes : [];

  const totalClientes = safeClientes.length;

  const normalizeCity = (city = "") =>
    city.trim().toLowerCase();

  const formatCity = (city = "") =>
    city
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const ciudadesUnicas = useMemo(() => {
    const unique = new Set(
      safeClientes
        .map((c) => normalizeCity(c?.address?.city))
        .filter(Boolean)
    );
    return unique.size;
  }, [safeClientes]);

  const clientesPorCiudad = useMemo(() => {
    const grouped = safeClientes.reduce((acc, cliente) => {
      const cityRaw = cliente?.address?.city;
      if (!cityRaw) return acc;

      const cityKey = normalizeCity(cityRaw);

      if (!acc[cityKey]) {
        acc[cityKey] = {
          city: formatCity(cityRaw),
          value: 0,
        };
      }

      acc[cityKey].value += 1;
      return acc;
    }, {});

    return Object.values(grouped)
      .sort((a, b) => b.value - a.value);
  }, [safeClientes]);

  const ultimosClientes = useMemo(() => {
    return [...safeClientes].slice(-5).reverse();
  }, [safeClientes]);

  const maxCiudad = useMemo(() => {
    if (!clientesPorCiudad.length) return 1;
    return Math.max(...clientesPorCiudad.map((c) => c.value));
  }, [clientesPorCiudad]);

  if (estado === "error") {
    return (
      <Container>
        <Typography color="error">Error al cargar dashboard</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f5f5", py: 4 }}>
      <Container maxWidth="lg">

        <Paper sx={{ p: 4, mb: 3, borderRadius: 3, color: "white", background: "linear-gradient(135deg, #034c95 0%, #015bb4 60%, #0284c7 100%)" }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Dashboard
          </Typography>
          <Typography sx={{ fontWeight: 500, opacity: 0.9 }}>
            Panel de control de clientes
          </Typography>
        </Paper>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={3}>

          <Paper
            component="button"
            onClick={() => navigate("/clientes")}
            role="button"
            aria-label="Ver clientes"
            sx={{
              p: 3,
              flex: 1,
              textAlign: "center",
              border: "none",
              cursor: "pointer",
              background: "white",
              transition: "all 0.6s ease",
              "&:hover": {
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                background: "rgba(3, 76, 149, 0.1)",
                transform: "translateY(-2px)",
              },
              "&:active": {
                transform: "scale(0.98)",
                background: "rgba(3, 76, 149, 0.2)",
              },
            }}
          >
            <PeopleIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Clientes
            </Typography>

            {loading ? (
              <Skeleton width={60} />
            ) : (
              <Typography variant="h4">{totalClientes}</Typography>
            )}
          </Paper>

          <Paper
            component="button"
            onClick={() => {
              distribucionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }}
            role="button"
            aria-label="Ir a distribución por ciudades"
            sx={{
              p: 3,
              flex: 1,
              textAlign: "center",
              border: "none",
              cursor: "pointer",
              background: "white",
              transition: "all 0.6s ease",
              "&:hover": {
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                background: "rgba(3, 76, 149, 0.1)",
                transform: "translateY(-2px)",
              },
              "&:active": {
                transform: "scale(0.98)",
                background: "rgba(3, 76, 149, 0.2)",
              },
            }}
          >
            <LocationCityIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Ciudades
            </Typography>
            <Typography variant="h4">{ciudadesUnicas}</Typography>
          </Paper>
        </Stack>

        {safeClientes.length === 0 && estado === "exito" && (
          <Typography sx={{ mb: 2 }}>No hay clientes disponibles</Typography>
        )}

        <Paper sx={{ p: 3, mt: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
            Últimos clientes agregados
          </Typography>

          {ultimosClientes.length === 0 ? (
            <Typography>No hay clientes aún</Typography>
          ) : (
            <Stack spacing={1}>
              {ultimosClientes.map((c) => (
                <Paper
                  key={c.id}
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateX(6px)",
                      background: "#f0f0f0",
                    },
                  }}
                >
                  <Typography fontWeight="bold">
                    {c?.name?.firstname} {c?.name?.lastname}
                  </Typography>

                  <Typography sx={{ color: "text.secondary" }}>
                    {c?.email}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "text.secondary",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.7,
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 16 }} />
                    {c?.phone || "Sin teléfono"}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </Paper>

        {/* distribucion por ciudad */}
        <Paper ref={distribucionRef} sx={{ p: 3, mt: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
            Distribución por ciudad
          </Typography>

          {clientesPorCiudad.length === 0 ? (
            <Typography>No hay datos de ciudades</Typography>
          ) : (
            <Stack spacing={2}>
              {clientesPorCiudad.map((c) => {
                const percent = (c.value / maxCiudad) * 100;

                return (
                  <Box key={c.city}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>{c.city}</Typography>
                      <Typography>{c.value}</Typography>
                    </Box>

                    <Box sx={{ height: 8, background: "#ddd", borderRadius: 5 }}>
                      <Box
                        sx={{
                          width: `${percent}%`,
                          height: "100%",
                          background: "#1976d2",
                          borderRadius: 5,
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
