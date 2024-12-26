"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Cliente, Pagamento } from "@/model/clienti";

interface ClientiContextType {
    clienti: Cliente[];
    aggiungiCliente: (cliente: Omit<Cliente, "id" | "pagamenti">) => void;
    eliminaCliente: (email: string) => void;
    aggiungiPagamento: (clienteId: number, pagamento: Omit<Pagamento, "dataInserimento">) => void;
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
                { id: 1, nome: "Mario", cognome: "Rossi", email: "mario.rossi@example.com", pagamenti: [] },
                { id: 2, nome: "Luigi", cognome: "Verdi", email: "luigi.verdi@example.com", pagamenti: [] },
                { id: 3, nome: "Giovanni", cognome: "Bianchi", email: "giovanni.bianchi@example.com", pagamenti: [] },
            ];
            localStorage.setItem("clienti", JSON.stringify(inizialiClienti));
            setClienti(inizialiClienti);
        }
    }, []);

    const salvaClienti = (clientiAggiornati: Cliente[]) => {
        localStorage.setItem("clienti", JSON.stringify(clientiAggiornati));
        setClienti(clientiAggiornati);
    };

    const aggiungiCliente = (cliente: Omit<Cliente, "id" | "pagamenti">) => {
        const nuovoCliente: Cliente = {
            id: clienti.length + 1,
            pagamenti: [],
            ...cliente,
        };
        salvaClienti([...clienti, nuovoCliente]);
    };

    const eliminaCliente = (email: string) => {
        const clientiAggiornati = clienti.filter(cliente => cliente.email !== email);
        salvaClienti(clientiAggiornati);
    };

    const aggiungiPagamento = (clienteId: number, pagamento: Omit<Pagamento, "dataInserimento">) => {
        const clientiAggiornati = clienti.map(cliente =>
            cliente.id === clienteId
                ? {
                      ...cliente,
                      pagamenti: [
                          ...cliente.pagamenti,
                          {
                              ...pagamento,
                              dataInserimento: new Date().toISOString(),
                          },
                      ],
                  }
                : cliente
        );
        salvaClienti(clientiAggiornati);
    };

    return (
        <ClientiContext.Provider value={{ clienti, aggiungiCliente, eliminaCliente, aggiungiPagamento: aggiungiPagamento }}>
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
