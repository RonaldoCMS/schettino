"use client";
import React, { useState } from "react";
import { Table, Button, Typography, Card, Col, Input, Row } from "antd";
import { useParams } from "next/navigation";
import { useClienti } from "@/context/ClientiContext";
import CreaPagamentoModal from "@/components/crea_pagamento";
import handleStampapagamenti from "@/utils/print_pagamento_cliente";

const { Title } = Typography;
const { Search } = Input;

const ClienteDettaglio: React.FC = () => {
    const { id } = useParams();
    const { clienti } = useClienti();
    const cliente = clienti.find(c => c.id === parseInt(Array.isArray(id) ? id[0] : id || "0"));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState("");

    if (!cliente) {
        return <div>Cliente non trovato</div>;
    }

    // Calcolo dei totali (con protezione per valori non numerici)
    const pagamenti = cliente.pagamenti;
    const totalePositivo: number = pagamenti.reduce((acc, pagamento) => pagamento.costo > 0 ? acc + (Number(pagamento.costo) || 0) : acc, 0);
    const totaleNegativo: number = pagamenti.reduce((acc, pagamento) => pagamento.costo < 0 ? acc + (Number(pagamento.costo) || 0) : acc, 0);

    // Filtro per la ricerca
    const filteredPagamenti = pagamenti.filter(pagamento =>
        Object.values(pagamento).some(value =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const columns = [
        { title: "Codice", dataIndex: "codice", key: "codice" },
        { title: "Descrizione", dataIndex: "descrizione", key: "descrizione" },
        { title: "Costo", dataIndex: "costo", key: "costo" },
        { title: "Data pagamento", dataIndex: "dataPagamento", key: "dataPagamento" },
        { title: "Tipo pagamento", dataIndex: "metodoPagamento", key: "metodoPagamento" },
        { title: "Data Inserimento", dataIndex: "dataInserimento", key: "dataInserimento" },
    ];

    return (
        <div>
            <Title level={2}>Dettaglio Cliente: {cliente.nome} {cliente.cognome}</Title>

            {/* Totali */}
            <Card style={{ marginBottom: "20px" }}>
                <div>
                    <p><strong>Totale pagamenti Positive: </strong>€ {totalePositivo}</p>
                    <p><strong>Totale pagamenti Negative: </strong>€ {totaleNegativo}</p>
                    <p><strong>Saldo Totale: </strong>€ {(totalePositivo + totaleNegativo)}</p>
                </div>
            </Card>

            {/* Ricerca */}
            <Row style={{ marginBottom: "20px" }}>
                <Col span={24}>
                    <Search
                        placeholder="Cerca per qualsiasi campo"
                        onChange={e => setSearchText(e.target.value)}
                        enterButton
                        allowClear
                    />
                </Col>
            </Row>

            {/* Tabella delle pagamenti */}
            <div className="hidden md:block">
                <Table
                    dataSource={filteredPagamenti}
                    columns={columns}
                    rowKey="codice"
                    pagination={{ pageSize: 10 }}
                />
            </div>

            <div className="md:hidden">
                {filteredPagamenti.map((pagamento, key) => (
                    <Col key={key} span={24} sm={12} md={8} style={{ marginBottom: "20px" }}>
                        <Card
                            title={`${pagamento.codice} - ${pagamento.dataPagamento}`}
                        >
                            <p>Descrizione: {pagamento.descrizione}</p>
                            <p>Saldo: €{pagamento.costo}</p>
                            <p>Metodo di pagamento: {pagamento.metodoPagamento}</p>
                        </Card>
                    </Col>
                ))}
            </div>

            {/* Tasti di azione */}
            <div style={{ marginTop: "20px" }}>
                <Button type="primary" onClick={() => setIsModalVisible(true)}>
                    Aggiungi pagamento
                </Button>
                <Button type="default" onClick={() => handleStampapagamenti(cliente, pagamenti)} style={{ marginLeft: "10px" }}>
                    Stampa pagamenti
                </Button>
            </div>

            {/* Modale per aggiungere una pagamento */}
            <CreaPagamentoModal
                clienteId={cliente.id}
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            />
        </div>
    );
};

export default ClienteDettaglio;
