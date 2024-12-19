"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Cliente, Fattura } from "@/model/clienti";

interface ClientiContextType {
    clienti: Cliente[];
    aggiungiCliente: (cliente: Omit<Cliente, "id" | "fatture">) => void;
    eliminaCliente: (email: string) => void;
    aggiungiFattura: (clienteId: number, fattura: Omit<Fattura, "dataInserimento">) => void;
}

const ClientiContext = createContext<ClientiContextType | undefined>(undefined);

const ClientiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clienti, setClienti] = useState<Cliente[]>([]);

    useEffect(() => {
        const storedClienti = localStorage.getItem("clienti");
        if (storedClienti) {
            setClienti(JSON.parse(storedClienti));
        } else {
            const inizialiClienti: Cliente[] = [
                { id: 1, nome: "Mario", cognome: "Rossi", email: "mario.rossi@example.com", fatture: [] },
                { id: 2, nome: "Luigi", cognome: "Verdi", email: "luigi.verdi@example.com", fatture: [] },
                { id: 3, nome: "Giovanni", cognome: "Bianchi", email: "giovanni.bianchi@example.com", fatture: [] },
            ];
            localStorage.setItem("clienti", JSON.stringify(inizialiClienti));
            setClienti(inizialiClienti);
        }
    }, []);

    const salvaClienti = (clientiAggiornati: Cliente[]) => {
        localStorage.setItem("clienti", JSON.stringify(clientiAggiornati));
        setClienti(clientiAggiornati);
    };

    const aggiungiCliente = (cliente: Omit<Cliente, "id" | "fatture">) => {
        const nuovoCliente: Cliente = {
            id: clienti.length + 1,
            fatture: [],
            ...cliente,
        };
        salvaClienti([...clienti, nuovoCliente]);
    };

    const eliminaCliente = (email: string) => {
        const clientiAggiornati = clienti.filter(cliente => cliente.email !== email);
        salvaClienti(clientiAggiornati);
    };

    const aggiungiFattura = (clienteId: number, fattura: Omit<Fattura, "dataInserimento">) => {
        const clientiAggiornati = clienti.map(cliente =>
            cliente.id === clienteId
                ? {
                      ...cliente,
                      fatture: [
                          ...cliente.fatture,
                          {
                              ...fattura,
                              dataInserimento: new Date().toISOString(),
                          },
                      ],
                  }
                : cliente
        );
        salvaClienti(clientiAggiornati);
    };

    return (
        <ClientiContext.Provider value={{ clienti, aggiungiCliente, eliminaCliente, aggiungiFattura }}>
            {children}
        </ClientiContext.Provider>
    );
};

export const useClienti = () => {
    const context = useContext(ClientiContext);
    if (!context) {
        throw new Error("useClienti deve essere usato all'interno di ClientiProvider");
    }
    return context;
};

export default ClientiProvider;
