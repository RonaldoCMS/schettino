"use client";

import React, { useState } from 'react';
import { Table, Typography, Card, Row, Col, Input } from 'antd';
import { useClienti } from '@/context/ClientiContext';

const { Title } = Typography;

const PagamentiScreen: React.FC = () => {
    const { clienti } = useClienti();
    const [searchText, setSearchText] = useState("");

    // Definizione delle colonne della tabella
    const columns = [
        { title: "Cliente", dataIndex: "cliente", key: "cliente" },
        { title: "Codice", dataIndex: "codice", key: "codice" },
        { title: "Descrizione", dataIndex: "descrizione", key: "descrizione" },
        { title: "Costo", dataIndex: "costo", key: "costo" },
        { title: "Metodo Pagamento", dataIndex: "metodoPagamento", key: "metodoPagamento" },
        { title: "Data Pagamento", dataIndex: "dataPagamento", key: "dataPagamento" },
        { title: "Data Inserimento", dataIndex: "dataInserimento", key: "dataInserimento" },
    ];

    // Prepara i dati per la tabella e per le Card
    const pagamentiData = clienti.flatMap(cliente => 
        cliente.pagamenti.map(pagamento => ({
            cliente: `${cliente.nome} ${cliente.cognome}`,
            codice: pagamento.codice,
            descrizione: pagamento.descrizione,
            costo: pagamento.costo,
            metodoPagamento: pagamento.metodoPagamento,
            datapagamento: pagamento.dataPagamento,
            dataInserimento: pagamento.dataInserimento
        }))
    );

    // Filtra i dati in base al testo di ricerca
    const filteredPagamentiData = pagamentiData.filter(pagamento =>
        Object.values(pagamento).some(value =>
            value?.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <div>
            <Title level={2}>Tutti i pagamenti</Title>

            {/* Componente di ricerca */}
            <Input
                placeholder="Cerca per qualsiasi campo..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 20, maxWidth: 300 }}
            />

            {/* Mostra le Card su dispositivi mobili */}
            <div className="md:hidden"> 
                <Row gutter={[16, 16]}>
                    {filteredPagamentiData.map((pagamento, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card title={`Pagamento ${pagamento.codice}`} bordered={false}>
                                <p><strong>Cliente:</strong> {pagamento.cliente}</p>
                                <p><strong>Descrizione:</strong> {pagamento.descrizione}</p>
                                <p><strong>Costo:</strong> € {pagamento.costo}</p>
                                <p><strong>Metodo Pagamento:</strong> {pagamento.metodoPagamento}</p>
                                <p><strong>Data pagamento:</strong> {pagamento.datapagamento}</p>
                                <p><strong>Data Inserimento:</strong> {pagamento.dataInserimento}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Mostra la tabella su desktop */}
            <div className="hidden md:block">
                <Table dataSource={filteredPagamentiData} columns={columns} rowKey="codice" />
            </div>
        </div>
    );
};

export default PagamentiScreen;
