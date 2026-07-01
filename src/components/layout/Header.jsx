import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Typography, IconButton, Chip, Paper,
  Tooltip, Button, Drawer, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const navButton = (active) => ({
  color: 'white',
  textTransform: 'none',
  borderRadius: '999px',
  px: 2,
  backgroundColor: 
  active ? 'rgba(255,255,255,0.2)' : 'transparent',
  border: '1px solid rgba(255,255,255,0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
});

export default function Header() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  const hideAdminInfo = useMediaQuery('(max-width:500px)');

  return (
    <>
{/* header */}
<Paper
  elevation={3}
  sx={{
    position: 'sticky',
    top: 0,
    zIndex: 1100,
    px: 0,
    py: 1.2,
    borderRadius: 0,
    background: 'linear-gradient(90deg, #034c95, #015bb4)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    minWidth: 0,
  }}
>
  {/* contenedor */}
  <Box
    sx={{
      width: '100%',
      maxWidth: '1600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: { xs: 0, md: 2.5 },
      minWidth: 0,
    }}
  >

    {/* desktop*/}
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 0,
      }}
    >
      {/* izq */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
        <DashboardIcon sx={{ fontSize: 30 }} />
        <Typography sx={{ fontWeight: 700 }}>Nexo</Typography>
      </Box>

      {/* secciones */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flex: 1,
          justifyContent: 'center',
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        <Button
          onClick={() => navigate('/')}
          startIcon={<DashboardIcon />}
          sx={navButton(isActive('/'))}
        >
          <Typography sx={{ fontWeight: 600 }}>Dashboard</Typography>
        </Button>

        <Button
          onClick={() => navigate('/clientes')}
          startIcon={<PeopleIcon />}
          sx={navButton(isActive('/clientes'))}
        >
          <Typography sx={{ fontWeight: 600 }}>Clientes</Typography>
        </Button>
      </Box>

      {/* der */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
        <Chip
          label={`${admin.name} (${admin.sector})`}
          sx={{
            backgroundColor: 'rgba(70,70,70,0.33)',
            color: 'white',
            fontWeight: 600,
          }}
        />

        <Tooltip title='Cerrar sesión'>
          <IconButton onClick={handleLogout} sx={{ color: 'white' }}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>

    {/* mobile */}
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 0,
      }}
    >
      {/* izq */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
        <IconButton onClick={() => setOpen(true)} sx={{ color: 'white', p: 0.5, ml: 1 }}>
          <MenuIcon />
        </IconButton>

        <DashboardIcon sx={{ fontSize: 28 }} />

        <Typography sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
          Nexo
        </Typography>
      </Box>

      {/* der */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
        {hideAdminInfo ? (
          <Tooltip title={`${admin.name} (${admin.sector})`}>
            <IconButton sx={{ color: 'white' }}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Chip
            label={`${admin.name} (${admin.sector})`}
            sx={{
              backgroundColor: 'rgba(70,70,70,0.33)',
              color: 'white',
              fontWeight: 600,
              flexShrink: 0,
            }}
          />
        )}

        <Tooltip title='Cerrar sesión'>
          <IconButton onClick={handleLogout} sx={{ color: 'white', mr: 2 }}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  </Box>
</Paper>

      {/* drawer */}
      <Drawer
        anchor='left'
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 330,
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 2,
            background: 'linear-gradient(90deg, #034c95, #015bb4)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
            Menú principal
          </Typography>

          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', px: 2 }}>
          <Typography
            sx={{
              fontSize: 11,
              letterSpacing: 1.2,
              opacity: 0.5,
              fontWeight: 700,
              pt: 2,
            }}
          >
            SECCIONES
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            <Box
              onClick={() => goTo('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.3,
                borderRadius: 2,
                cursor: 'pointer',
                backgroundColor:
                  location.pathname === '/'
                    ? 'rgba(25, 118, 210, 0.12)'
                    : 'transparent',
                    border: 
                    location.pathname === '/'
                    ? '1px solid rgba(0, 0, 0, 0.1)'
                    : '1px solid transparent',

                '&:hover': {
                  backgroundColor:
                    location.pathname === '/'
                      ? 'rgba(25, 118, 210, 0.12)'
                      : 'rgba(234, 234, 234, 0.12)', 
                },
              }}
            >
              <DashboardIcon sx={{ fontSize: 20 }} />
              <Typography>Dashboard</Typography>
            </Box>

            <Box
              onClick={() => goTo('/clientes')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.3,
                borderRadius: 2,
                cursor: 'pointer',
                backgroundColor:
                  location.pathname === '/clientes'
                    ? 'rgba(25, 118, 210, 0.12)'
                    : 'transparent',
                    border: 
                    location.pathname === '/clientes'
                    ? '1px solid rgba(0, 0, 0, 0.1)'
                    : '1px solid transparent',

                '&:hover': {
                  backgroundColor:
                    location.pathname === '/clientes'
                      ? 'rgba(25, 118, 210, 0.12)'
                      : 'rgba(234, 234, 234, 0.12)',
                },
              }}
            >
              <PeopleIcon sx={{ fontSize: 20 }} />
              <Typography>Clientes</Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}