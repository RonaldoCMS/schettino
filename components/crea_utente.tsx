import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface Props {
    visible: boolean;
    onCancel: () => void;
    onCreate: (values: { nome: string; cognome: string; email: string }) => void;
}

const ModaleCreaCliente: React.FC<Props> = ({ visible, onCancel, onCreate }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then(onCreate).then(() => {
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Crea Nuovo Cliente"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Annulla
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Crea
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Nome"
                    name="nome"
                    rules={[{ required: true, message: 'Inserisci il nome del cliente' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Cognome"
                    name="cognome"
                    rules={[{ required: true, message: 'Inserisci il cognome del cliente' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Inserisci l\'email del cliente' },
                        { type: 'email', message: 'Inserisci un indirizzo email valido' },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModaleCreaCliente;
