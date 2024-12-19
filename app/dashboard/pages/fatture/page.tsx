"use client";

import React from 'react';
import { Table, Typography, Card, Row, Col } from 'antd';
import { useClienti } from '@/context/ClientiContext';

const { Title } = Typography;

const FattureScreen: React.FC = () => {
    const { clienti } = useClienti();

    const columns = [
        { title: "Cliente", dataIndex: "cliente", key: "cliente" },
        { title: "Codice", dataIndex: "codice", key: "codice" },
        { title: "Descrizione", dataIndex: "descrizione", key: "descrizione" },
        { title: "Costo", dataIndex: "costo", key: "costo" },
        { title: "Data Fattura", dataIndex: "dataFattura", key: "dataFattura" },
        { title: "Data Inserimento", dataIndex: "dataInserimento", key: "dataInserimento" },
    ];

    const fattureData = clienti.flatMap(cliente => 
        cliente.fatture.map(fattura => ({
            cliente: `${cliente.nome} ${cliente.cognome}`,
            codice: fattura.codice,
            descrizione: fattura.descrizione,
            costo: fattura.costo,
            dataFattura: fattura.dataFattura,
            dataInserimento: fattura.dataInserimento
        }))
    );

    // Logica per la visibilità delle Card
    const isMobile = window.innerWidth <= 768;

    return (
        <div>
            <Title level={2}>Tutte le Fatture</Title>

            {/* Mostra le Card su dispositivi mobili */}
            {isMobile ? (
                <Row gutter={[16, 16]}>
                    {fattureData.map((fattura, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card title={`Fattura ${fattura.codice}`} bordered={false}>
                                <p><strong>Cliente:</strong> {fattura.cliente}</p>
                                <p><strong>Descrizione:</strong> {fattura.descrizione}</p>
                                <p><strong>Costo:</strong> € {fattura.costo}</p>
                                <p><strong>Data Fattura:</strong> {fattura.dataFattura}</p>
                                <p><strong>Data Inserimento:</strong> {fattura.dataInserimento}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                // Mostra la Table su schermi più grandi
                <Table dataSource={fattureData} columns={columns} rowKey="codice" />
            )}
        </div>
    );
};

export default FattureScreen;
