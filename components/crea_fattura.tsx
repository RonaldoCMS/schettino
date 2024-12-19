"use client";
import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { Fattura } from "@/model/clienti";
import { useClienti } from "@/context/ClientiContext";

interface CreaFatturaModalProps {
    clienteId: number;
    visible: boolean;
    onClose: () => void;
}

const CreaFatturaModal: React.FC<CreaFatturaModalProps> = ({ clienteId, visible, onClose }) => {
    const { aggiungiFattura } = useClienti();
    const [form] = Form.useForm(); // Gestisce il form

    const handleAggiungiFattura = (values: Omit<Fattura, "dataInserimento">) => {
        // Aggiungi la fattura al cliente
        aggiungiFattura(clienteId, values);
        
        // Reset del modulo e chiusura della modale
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Aggiungi Fattura"
            open={visible}
            onCancel={() => {
                form.resetFields(); // Reset dei campi del form quando la modale si chiude
                onClose();
            }}
            footer={null}
        >
            <Form
                form={form}
                onFinish={handleAggiungiFattura}
                layout="vertical"
            >
                <Form.Item
                    name="codice"
                    label="Codice"
                    rules={[{ required: true, message: "Campo obbligatorio" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="descrizione"
                    label="Descrizione"
                    rules={[{ required: true, message: "Campo obbligatorio" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="costo"
                    label="Costo"
                    rules={[{ required: true, message: "Campo obbligatorio" }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="dataFattura"
                    label="Data Fattura"
                    rules={[{ required: true, message: "Campo obbligatorio" }]}
                >
                    <Input type="date" />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Salva
                </Button>
            </Form>
        </Modal>
    );
};

export default CreaFatturaModal;
