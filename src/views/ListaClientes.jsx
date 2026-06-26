import { useState } from "react";
import Button from "@mui/material/Button";
import ModuloC from "../components/common/ModuloC";
import Dialog from "@mui/material/Dialog";

function ListaClientes() {

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const handleOpen = () => setMostrarFormulario(true);
    const handleClose = () => setMostrarFormulario(false);

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>Ingresar nuevo Cliente</Button>

            <Dialog open={mostrarFormulario} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{sx: { borderRadius: 4 }}}>
                <ModuloC onCerrar={handleClose} />
            </Dialog>
        </>
    );
}

export default ListaClientes;
