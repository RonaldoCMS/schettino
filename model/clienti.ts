export interface Cliente {
    id: number;
    nome: string;
    cognome: string;
    email: string;
    fatture: Fattura[]; // Aggiunto array di fatture
}

export interface Fattura {
    codice: string;
    descrizione: string;
    costo: number;
    dataFattura: string;
    dataInserimento: string;
}