import { Box, Typography, Stack, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        mt: "auto",
        background: "linear-gradient(90deg, #002245, #002f5f)",
        color: "white",
        py: 3,
        px: 2.5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1600px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "center" },
          gap: 3,
        }}
      >
        {/* izq */}
        <Box
          sx={{
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
            Nexo
          </Typography>

          <Typography sx={{ fontSize: 12, opacity: 0.85, mt: 0.5 }}>
            Panel de control de clientes
          </Typography>

          <Typography sx={{ fontSize: 11, opacity: 0.7, mt: 1 }}>
            © {new Date().getFullYear()} Todos los derechos reservados
          </Typography>
        </Box>

        {/* centro */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", md: "420px" },
          }}
        >
          <Button
            onClick={scrollToTop}
            variant="outlined"
            startIcon={<KeyboardArrowUpIcon />}
            sx={{
              width: "100%",
              color: "white",
              borderColor: "rgba(255,255,255,0.35)",
              borderRadius: 3,
              py: 1.2,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            Volver arriba
          </Button>
        </Box>

        {/* der */}
        <Box
          sx={{
            textAlign: { xs: "center", md: "right" },
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1 }}>
            Desarrollado por
          </Typography>

          <Stack spacing={0.5}>
            {[
              {
                name: "Alexander Lobo",
                url: "https://github.com/alexanderlobo20",
              },
              {
                name: "Fernando Baca",
                url: "https://github.com/fernando-eb2406",
              },
              {
                name: "Florencia Villar",
                url: "https://github.com/florenciavillar14-19",
              },
            ].map((dev) => (
              <Stack
                key={dev.url}
                direction="row"
                spacing={1}
                sx={{
                  justifyContent: { xs: "center", md: "flex-end" },
                  alignItems: "center",
                }}
              >
                <GitHubIcon sx={{ fontSize: 16 }} />

                <a
                  href={dev.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    fontSize: 12,
                    opacity: 0.9,
                  }}
                >
                  {dev.name}
                </a>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}