import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Typography } from "@mui/material";

const ModuloC = ({ onCerrar }) => {

    const [form, setForm] = useState({email: "",username: "",password: "",firstname: "",lastname: "",phone: "",city: "",street: "",number: "",zipcode: ""});

    const [mensaje, setMensaje] = useState("");
    const [severity, setSeverity] = useState("success");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const style = {
        titulo: {
            padding: "2px",
            color: "black",
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "Century Gothic, sans-serif",
            borderBottom: "3px solid #1976d2",
            display: "inline-block",
            paddingBottom: "8px"
        },

        Boton1: {
            mt: 3,
            m: 4,
            px: 4,
            py: 1.5,
            borderRadius: "8px",
            backgroundColor: "#0b76e049",
            fontWeight: "bold",
            "&:hover": {
                color: "white",
                backgroundColor: "#115293"
            },
            fontFamily: "Century Gothic, sans-serif",
            cursor: "pointer"
        },

        Boton2: {
            mt: 3,
            m: 4,
            px: 4,
            py: 1.5,
            borderRadius: "8px",
            backgroundColor: "#e00b0b49",
            fontWeight: "bold",
            color: "#e00b0b",
            "&:hover": {
                color: "white",
                backgroundColor: "#931111"
            },
            fontFamily: "Century Gothic, sans-serif",
            cursor: "pointer"
        },

        Texto: {
            m: "20px",
            width: "50%"
        }
    };

    const guardarCliente = async () => {

        const campos = Object.values(form);

        if (campos.some(c => !c)) {
            setSeverity("error");
            setMensaje("Completa todos los campos");
            setSnackbarOpen(true);
            return;
        }

        const cliente = {
            email: form.email,
            username: form.username,
            password: form.password,
            name: {
                firstname: form.firstname,
                lastname: form.lastname
            },
            phone: form.phone,
            address: {
                city: form.city,
                street: form.street,
                number: Number(form.number),
                zipcode: form.zipcode
            }
        };

        try {
            const respuesta = await fetch("https://fakestoreapi.com/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cliente),
            });

            const datos = await respuesta.json();
            console.log(datos);

            setSeverity("success");
            setMensaje(`Usuario creado con ID: ${datos.id}`);
            setSnackbarOpen(true);

            setForm({email: "",username: "",password: "",firstname: "",lastname: "",phone: "",city: "",street: "",number: "",zipcode: ""});

        } catch (error) {
            console.error("Error al guardar el cliente:", error);
            setMensaje("Error al crear usuario");
            setSeverity("error");
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <Typography variant="h2" sx={style.titulo}>Datos Personales:</Typography>

            <div>
                <TextField label="Email" name="email" value={form.email} onChange={handleChange} sx={style.Texto} />
                <TextField label="Username" name="username" value={form.username} onChange={handleChange} sx={style.Texto} />
                <TextField label="Password" name="password" value={form.password} onChange={handleChange} sx={style.Texto} />
            </div>

            <Typography variant="h2" sx={style.titulo}>Nombre:</Typography>

            <div>
                <TextField label="Firstname" name="firstname" value={form.firstname} onChange={handleChange} sx={style.Texto} />
                <TextField label="Lastname" name="lastname" value={form.lastname} onChange={handleChange} sx={style.Texto} />
                <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} sx={style.Texto} />
            </div>

            <Typography variant="h2" sx={style.titulo}>Dirección:</Typography>

            <div>
                <TextField label="City" name="city" value={form.city} onChange={handleChange} sx={style.Texto} />
                <TextField label="Street" name="street" value={form.street} onChange={handleChange} sx={style.Texto} />
                <TextField label="Number" name="number" value={form.number} onChange={handleChange} sx={style.Texto} />
                <TextField label="Zipcode" name="zipcode" value={form.zipcode} onChange={handleChange} sx={style.Texto} />
            </div>

            <Button variant="contained" sx={style.Boton1} onClick={guardarCliente}>
                Guardar Usuario
            </Button>

            <Button variant="contained" sx={style.Boton2} onClick={onCerrar}>
                Volver
            </Button>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={(event, reason) => {
                    if (reason === "clickaway") return;
                    setSnackbarOpen(false);
                }}
            >
                <Alert severity={severity} onClose={() => setSnackbarOpen(false)}>
                    {mensaje}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ModuloC;

