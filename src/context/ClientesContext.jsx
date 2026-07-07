import { createContext, useContext, useEffect, useState } from "react";

const ClientesContext = createContext();

export const ClienteProvider = ({ children }) => {
    const [clientes, setClientes] = useState(() => {
        const guardados = localStorage.getItem("clientesGuardados");
        return guardados ? JSON.parse(guardados) : [];
    });

    const [estado, setEstado] = useState('carga');

    useEffect(() => {
        const buscarClientes = async () => {
            try {
                setEstado('carga');

                if (clientes.length > 0){
                    setEstado('exito');
                    return;
                }

                const res = await fetch("https://fakestoreapi.com/users");

                if (!res.ok) {
                    throw new Error(
                        `Error ${res.status}: No se pudo obtener clientes`,
                    );
                }
                const data = await res.json();

                setClientes(Array.isArray(data) ? data : []);

                setEstado('exito');

            } catch (error) {
                console.error(error);
                setEstado('error');
            } 
            
        };
        buscarClientes();
    }, []);

    useEffect(() => {
         localStorage.setItem ("clientesGuardados", JSON.stringify(clientes));
    },[clientes]);


    const agregarCliente = (cliente) => {
        setClientes((prev) => [cliente, ...prev]);
    };

    const eliminarCliente = async (id) => {
    try {
        await fetch(`https://fakestoreapi.com/users/${id}`, {
            method: "DELETE",
        });

        setClientes((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
        console.error("Error eliminando cliente",error);
    }
};

    return (
        <ClientesContext.Provider value={{ agregarCliente, eliminarCliente, clientes, estado }}>
            {children}
        </ClientesContext.Provider>
    );
};

export const useClientes = () => useContext(ClientesContext);
