import React, { useState } from "react";
import { Modal, Button, Input, Typography } from "antd";

const { Text } = Typography;

interface ModaleConfermaEliminazioneProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (email: string) => void;
    emailUtente: string;
}

const ModaleConfermaEliminazione: React.FC<ModaleConfermaEliminazioneProps> = ({
    visible,
    onClose,
    onConfirm,
    emailUtente,
}) => {
    const [inputEmail, setInputEmail] = useState("");

    const handleConfirm = () => {
        if (inputEmail === emailUtente) {
            onConfirm(emailUtente);
            setInputEmail("");
        } else {
            alert("L'email inserita non corrisponde.");
        }
    };

    return (
        <Modal
            title="Conferma Eliminazione"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Annulla
                </Button>,
                <Button key="confirm" type="primary" danger onClick={handleConfirm}>
                    Conferma
                </Button>,
            ]}
        >
            <Text>
                Sei sicuro di voler eliminare questo cliente? Scrivi l'email del cliente{" "}
                <b>{emailUtente}</b> per confermare.
            </Text>
            <Input
                placeholder="Inserisci email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                style={{ marginTop: "10px" }}
            />
        </Modal>
    );
};

export default ModaleConfermaEliminazione;
