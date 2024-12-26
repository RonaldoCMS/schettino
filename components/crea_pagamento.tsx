"use client";
import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { Pagamento } from "@/model/clienti";
import { useClienti } from "@/context/ClientiContext";

interface CreaFatturaModalProps {
    clienteId: number;
    visible: boolean;
    onClose: () => void;
}

const CreaFatturaModal: React.FC<CreaFatturaModalProps> = ({ clienteId, visible, onClose }) => {
    const { aggiungiPagamento: aggiungiPagamento } = useClienti();
    const [form] = Form.useForm(); // Gestisce il form

    const handleAggiungiPagamento = (values: Omit<Pagamento, "dataInserimento">) => {
        // Aggiungi la fattura al cliente
        aggiungiPagamento(clienteId, values);

        // Reset del modulo e chiusura della modale
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Aggiungi Pagamento"
            open={visible}
            onCancel={() => {
                form.resetFields(); // Reset dei campi del form quando la modale si chiude
                onClose();
            }}
            footer={null}
        >
            <Form
                form={form}
                onFinish={handleAggiungiPagamento}
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
                    name="dataPagamento"
                    label="Data pagamento"
                    rules={[{ required: true, message: "Campo obbligatorio" }]}
                >
                    <Input type="date" />
                </Form.Item>
                <Form.Item
                    name="metodoPagamento"
                    label="Metodo di Pagamento"
                    rules={[{ required: true, message: "Selezionare un metodo di pagamento" }]}
                >
                    <Select placeholder="Seleziona metodo di pagamento">
                        <Select.Option value="contanti">Contanti</Select.Option>
                        <Select.Option value="pos">Pos</Select.Option>
                    </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Salva
                </Button>
            </Form>
        </Modal>
    );
};

export default CreaFatturaModal;
