"use client";

import React from "react";
import { Card, Col, Row, Button, Typography, Layout } from "antd";
import { useRouter } from "next/navigation";
import { UserOutlined, FileTextOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function Dashboard() {
    const router = useRouter();

    const handleNavigate = (path: string) => {
        router.push(path);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ padding: 0 }}>
                <div style={{   fontSize: 20, padding: "10px 20px" }}>
                    <Title level={3} style={{ color: "white" }}>Dashboard</Title>
                </div>
            </Header>

            <Content style={{ padding: "50px 50px", marginTop: 30 }}>
                <Row gutter={16} justify="center">
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            style={{
                                width: "100%",
                                textAlign: "center",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.3s ease-in-out",
                            }}
                            
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            cover={
                                <img
                                    alt="Clienti"
                                    src="https://via.placeholder.com/300x200?text=Clienti"
                                />
                            }
                        >
                            <Title level={4}>Clienti</Title>
                            <Button
                                type="primary"
                                icon={<UserOutlined />}
                                onClick={() => handleNavigate("/dashboard/pages/clienti")}
                                block
                                style={{ marginTop: 16 }}
                            >
                                Vai a Clienti
                            </Button>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            style={{
                                width: "100%",
                                textAlign: "center",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.3s ease-in-out",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            cover={
                                <img
                                    alt="Fatture"
                                    src="https://via.placeholder.com/300x200?text=Fatture"
                                />
                            }
                        >
                            <Title level={4}>Tutte le Fatture</Title>
                            <Button
                                type="primary"
                                icon={<FileTextOutlined />}
                                onClick={() => handleNavigate("/dashboard/pages/fatture")}
                                block
                                style={{ marginTop: 16 }}
                            >
                                Vai a Fatture
                            </Button>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            style={{
                                width: "100%",
                                textAlign: "center",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.3s ease-in-out",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            cover={
                                <img
                                    alt="Esci"
                                    src="https://via.placeholder.com/300x200?text=Esci"
                                />
                            }
                        >
                            <Title level={4}>Esci</Title>
                            <Button
                                type="primary"
                                icon={<LogoutOutlined />}
                                onClick={() => handleNavigate("/")}
                                block
                                style={{ marginTop: 16 }}
                            >
                                Logout
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Content>

           
        </Layout>
    );
}
