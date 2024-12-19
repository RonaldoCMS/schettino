"use client";
import React, { useState } from "react";
import { Table, Button, Typography, Card, Col } from "antd";
import { useParams } from "next/navigation";
import { useClienti } from "@/context/ClientiContext";
import CreaFatturaModal from "@/components/crea_fattura";
import styles from './style.css';

const { Title } = Typography;

const ClienteDettaglio: React.FC = () => {
    const { id } = useParams();
    const { clienti } = useClienti();
    const cliente = clienti.find(c => c.id === parseInt(id || "0"));
    const [isModalVisible, setIsModalVisible] = useState(false);

    if (!cliente) {
        return <div>Cliente non trovato</div>;
    }

    // Calcolo dei totali (con protezione per valori non numerici)
    const fatture = cliente.fatture;
    const totalePositivo: number = fatture.reduce((acc, fattura) => fattura.costo > 0 ? acc + (Number(fattura.costo) || 0) : acc, 0);
    const totaleNegativo: number = fatture.reduce((acc, fattura) => fattura.costo < 0 ? acc + (Number(fattura.costo) || 0) : acc, 0);

    // Funzione di stampa
    const handleStampaFatture = () => {
        const printWindow = window.open('', '', 'width=800, height=600');
        const styles = `
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 40px;
                    color: #333;
                    background-color: #fafafa;
                }
                h2 {
                    text-align: center;
                    color: #fff;
                    background-color: #0066cc;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .logo {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    border-radius: 8px;
                    overflow: hidden;
                    border: 1px solid #ddd;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                }
                th, td {
                    padding: 12px 15px;
                    text-align: left;
                    border: 1px solid #ddd;
                }
                th {
                    background-color: #0066cc;
                    color: white;
                    font-weight: bold;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:nth-child(odd) {
                    background-color: #ffffff;
                }
                tr:hover {
                    background-color: #e1e1e1;
                }
                td {
                    font-size: 14px;
                    color: #333;
                }
                .totals {
                    margin-top: 40px;
                    text-align: right;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    border-top: 3px solid #0066cc;
                }
                .totals p {
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                    margin: 10px 0;
                }
                .totals p span {
                    font-weight: normal;
                    color: #555;
                }
                .total-header {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: #0066cc;
                }
                .page-footer {
                    text-align: center;
                    margin-top: 40px;
                    font-size: 12px;
                    color: #777;
                }
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .totals {
                        page-break-before: always;
                    }
                }
            </style>
        `;
    
        printWindow?.document.write('<html><head>' + styles + '</head><body>');
        printWindow?.document.write('<h2>Fatture Cliente: ' + cliente.nome + ' ' + cliente.cognome + '</h2>');
        
        // Tabella Fatture
        printWindow?.document.write('<table><tr><th>Codice</th><th>Descrizione</th><th>Costo</th><th>Data Fattura</th><th>Data Inserimento</th></tr>');
        fatture.forEach(fattura => {
            printWindow?.document.write(`
                <tr>
                    <td>${fattura.codice}</td>
                    <td>${fattura.descrizione}</td>
                    <td>${fattura.costo}</td>
                    <td>${fattura.dataFattura}</td>
                    <td>${fattura.dataInserimento}</td>
                </tr>
            `);
        });
    
        printWindow?.document.write('</table>');
    
        // Sezione Totali
        printWindow?.document.write(`
            <div class="totals">
                <div class="total-header">Riepilogo Totale Fatture</div>
                <p><strong>Totale Fatture Positive:</strong> € ${totalePositivo.toFixed(2)}</p>
                <p><strong>Totale Fatture Negative:</strong> € ${totaleNegativo.toFixed(2)}</p>
                <p><strong>Saldo Totale:</strong> € ${(totalePositivo + totaleNegativo).toFixed(2)}</p>
            </div>
        `);
    
        // Footer
        printWindow?.document.write(`
            <div class="page-footer">
                <p>Stampato il: ${new Date().toLocaleString()}</p>
            </div>
        `);
    
        printWindow?.document.write('</body></html>');
        printWindow?.document.close();
        printWindow?.print();
    };
    
    

    const columns = [
        { title: "Codice", dataIndex: "codice", key: "codice" },
        { title: "Descrizione", dataIndex: "descrizione", key: "descrizione" },
        { title: "Costo", dataIndex: "costo", key: "costo" },
        { title: "Data Fattura", dataIndex: "dataFattura", key: "dataFattura" },
        { title: "Data Inserimento", dataIndex: "dataInserimento", key: "dataInserimento" },
    ];

    return (
        <div className={styles.container}>
            <Title level={2}>Dettaglio Cliente: {cliente.nome} {cliente.cognome}</Title>
            
            {/* Totali */}
            <Card className={styles.card}>
                <div className={styles.totali}>
                    <p><strong>Totale Fatture Positive: </strong>€ {totalePositivo.toFixed(2)}</p>
                    <p><strong>Totale Fatture Negative: </strong>€ {totaleNegativo.toFixed(2)}</p>
                    <p><strong>Saldo Totale: </strong>€ {(totalePositivo + totaleNegativo).toFixed(2)}</p>
                </div>
            </Card>

            {/* Tabella delle fatture */}
            <div className="hidden md:block">
                <Table
                    dataSource={fatture}
                    columns={columns}
                    rowKey="codice"
                    pagination={false}
                    style={{ display: window.innerWidth <= 768 ? 'none' : 'block' }}
                />
            </div>

            <div className="md:hidden">
                {cliente.fatture.map((cliente, key) => (
                    <Col key={key} span={24} sm={12} md={8}>
                        <Card
                            title={`${cliente.codice} ${cliente.dataFattura}`}


                        >
                            <p>Descrizione: {cliente.descrizione}</p>
                            <p>Saldo {cliente.costo}</p>
                        </Card>
                    </Col>
                ))}
            </div>
            {/* Tasti di azione */}
            <div className={styles.buttons}>
                <Button type="primary" onClick={() => setIsModalVisible(true)} className={styles.button}>
                    Aggiungi Fattura
                </Button>
                <Button type="default" onClick={handleStampaFatture} style={{ marginLeft: '10px' }} className={styles.button}>
                    Stampa Fatture
                </Button>
            </div>

            {/* Modale per aggiungere una fattura */}
            <CreaFatturaModal
                clienteId={cliente.id}
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            />
        </div>
    );
};

export default ClienteDettaglio;
