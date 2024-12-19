"use client";

import React, { useState } from "react";
import { Button, notification, Modal, Spin, Card, Row, Col, Table } from "antd";
import { useClienti } from "@/context/ClientiContext";
import { useRouter } from "next/navigation";
import ModaleCreaCliente from "@/components/crea_utente";
import ModaleConfermaEliminazione from "@/components/elimina_utente";

const ClientiTable: React.FC = () => {
    const router = useRouter();
    const { clienti, aggiungiCliente, eliminaCliente } = useClienti();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [clienteSelezionato, setClienteSelezionato] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleDettaglio = (id: number) => {
        router.push(`/dashboard/pages/clienti/${id}`);
    };

    const handleAggiungiCliente = async (values: { nome: string; cognome: string; email: string }) => {
        setLoading(true);
        try {
            await aggiungiCliente(values);
            notification.success({
                message: "Cliente aggiunto con successo",
                description: `${values.nome} ${values.cognome} è stato aggiunto al sistema.`,
            });
            setIsModalVisible(false);
        } catch (error) {
            notification.error({
                message: "Errore",
                description: "Si è verificato un errore nell'aggiunta del cliente.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleConfermaEliminazione = async (email: string) => {
        setLoading(true);
        try {
            await eliminaCliente(email);
            notification.success({
                message: "Cliente eliminato",
                description: "Il cliente è stato eliminato con successo.",
            });
            setIsDeleteModalVisible(false);
        } catch (error) {
            notification.error({
                message: "Errore",
                description: "Si è verificato un errore nell'eliminazione del cliente.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={() => setIsModalVisible(true)}
                style={{ marginBottom: "10px" }}
                loading={loading}
            >
                Crea Cliente
            </Button>

            {/* Desktop View: Table */}
            <div className="hidden md:block">
                <Table
                    dataSource={clienti}
                    columns={[
                        {
                            title: "ID",
                            dataIndex: "id",
                            key: "id",
                        },
                        {
                            title: "Nome",
                            dataIndex: "nome",
                            key: "nome",
                        },
                        {
                            title: "Cognome",
                            dataIndex: "cognome",
                            key: "cognome",
                        },
                        {
                            title: "Email",
                            dataIndex: "email",
                            key: "email",
                        },
                        {
                            title: "Azioni",
                            key: "azioni",
                            render: (text: any, record: any) => (
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <Button type="link" onClick={() => handleDettaglio(record.id)}>
                                        Dettagli
                                    </Button>
                                    <Button
                                        danger
                                        onClick={() => {
                                            setClienteSelezionato(record.email);
                                            setIsDeleteModalVisible(true);
                                        }}
                                    >
                                        Cancella
                                    </Button>
                                </div>
                            ),
                        },
                    ]}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    style={{ marginBottom: "20px" }}
                />
            </div>

            {/* Mobile View: Cards */}
            <div className="md:hidden">
                <Row gutter={[16, 16]}>
                    {clienti.map((cliente) => (
                        <Col key={cliente.id} span={24} sm={12} md={8}>
                            <Card
                                title={`${cliente.nome} ${cliente.cognome}`}
                                extra={
                                    <Button
                                        danger
                                        onClick={() => {
                                            setClienteSelezionato(cliente.email);
                                            setIsDeleteModalVisible(true);
                                        }}
                                    >
                                        Cancella
                                    </Button>
                                }
                                actions={[
                                    <Button type="link" onClick={() => handleDettaglio(cliente.id)}>
                                        Dettagli
                                    </Button>,
                                ]}
                            >
                                <p>Email: {cliente.email}</p>
                                <p>ID: {cliente.id}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <ModaleCreaCliente
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onCreate={handleAggiungiCliente}
            />
            {clienteSelezionato && (
                <ModaleConfermaEliminazione
                    visible={isDeleteModalVisible}
                    onClose={() => setIsDeleteModalVisible(false)}
                    onConfirm={handleConfermaEliminazione}
                    emailUtente={clienteSelezionato}
                />
            )}
            {loading && (
                <Modal visible={true} footer={null} closable={false}>
                    <Spin size="large" />
                </Modal>
            )}
        </div>
    );
};

export default ClientiTable;
