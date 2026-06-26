import { useState } from "react";
import { Box, Typography, TextField, Button, Snackbar, Alert, Divider, Stack} from "@mui/material";

const ModuloC = ({ onCerrar }) => {

    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
        city: "",
        street: "",
        number: "",
        zipcode: "",
    });

    const [mensaje, setMensaje] = useState("");
    const [severity, setSeverity] = useState("success");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const guardarCliente = async () => {

        const campos = Object.values(form);

        if (campos.some((c) => !String(c).trim())) {
            setSeverity("error");
            setMensaje("Completa todos los campos");
            setSnackbarOpen(true);
            return;
        }

        setLoading(true);

        const cliente = {
            email: form.email,
            username: form.username,
            password: form.password,
            name: {
                firstname: form.firstname,
                lastname: form.lastname,
            },
            phone: form.phone,
            address: {
                city: form.city,
                street: form.street,
                number: form.number ? Number(form.number) : 0,
                zipcode: form.zipcode,
            },
        };

        try {
            const respuesta = await fetch("https://fakestoreapi.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente),
            });

            if (!respuesta.ok) {
                throw new Error("Error en la creación del usuario");
            }

            const datos = await respuesta.json();

            setSeverity("success");
            setMensaje(`Usuario creado correctamente. ID: ${datos.id}`);
            setSnackbarOpen(true);

            setForm({
                email: "",
                username: "",
                password: "",
                firstname: "",
                lastname: "",
                phone: "",
                city: "",
                street: "",
                number: "",
                zipcode: "",
            });

        } catch (error) {
            console.error(error);

            setSeverity("error");
            setMensaje("Ocurrió un error al crear el usuario");
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box sx={{ p: 4 }}>

                <Typography
                    variant="h4"
                    fontWeight={800}
                    textAlign="center"
                    sx={{
                        mb: 1,
                        background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        letterSpacing: 1,
                    }}
                >
                    Registro de Cliente
                </Typography>

                <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Completa los datos para dar de alta un nuevo usuario en el sistema
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Typography variant="h6" sx={{ mb: 2 }}>
                    Datos de la Cuenta
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        label="Correo electrónico"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Nombre de usuario"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </Stack>

                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Información Personal
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr",
                        },
                        gap: 2,
                    }}
                >
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Apellido"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Teléfono"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </Box>

                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Dirección
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr",
                        },
                        gap: 2,
                    }}
                >
                    <TextField
                        fullWidth
                        label="Ciudad"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Calle"
                        name="street"
                        value={form.street}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Número"
                        name="number"
                        type="number"
                        value={form.number}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Código Postal"
                        name="zipcode"
                        value={form.zipcode}
                        onChange={handleChange}
                    />
                </Box>

                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                    sx={{ mt: 4 }}
                >
                   <Button
                        variant="contained"
                        onClick={onCerrar}
                        sx={{
                            backgroundColor: "#d32f2f",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "#9a0007",
                            },
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={guardarCliente}
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Guardar Cliente"}
                    </Button>
                </Stack>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Alert
                    severity={severity}
                    variant="filled"
                    onClose={() => setSnackbarOpen(false)}
                    sx={{ width: "100%" }}
                >
                    {mensaje}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ModuloC;

