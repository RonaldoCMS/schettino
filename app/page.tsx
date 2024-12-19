"use client";

import React, { useState } from "react";
 import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Typography, Space } from "antd";
import { useAuth } from "@/context/AuthContext";

const { Title } = Typography;

const Authentication: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = (): void => {
        const isLoggedIn = login(username, password);
        if (isLoggedIn) {
            router.push("/dashboard"); // Reindirizza a /dashboard
        } else {
            alert("Invalid username or password!");
        }
    };

    return (
        <Card
            style={{
                maxWidth: 400,
                margin: "auto",
                marginTop: 50,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
        >
            <Space direction="vertical" style={{ width: "100%" }}>
                <Title level={3} style={{ textAlign: "center" }}>
                    Login
                </Title>
                <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            { required: true, message: "Please enter your username!" },
                        ]}
                    >
                        <Input
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: "Please enter your password!" },
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{ marginTop: 10 }}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Space>
        </Card>
    );
};

export default Authentication;
