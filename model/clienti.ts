export interface Cliente {
    id: number;
    nome: string;
    cognome: string;
    email: string;
    pagamenti: Pagamento[]; // Aggiunto array di pagamenti
}

export interface Pagamento {
    codice: string;
    descrizione: string;
    costo: number;
    dataPagamento: string;
    dataInserimento: string;
    metodoPagamento: "contanti" | "pos"; // Aggiunto tipo di pagamento
}