"use client";

import React from "react";
import { Layout, Button, Typography } from "antd";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Naviga indietro alla pagina precedente
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          backgroundColor: "#001529",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            icon={<ArrowLeftOutlined />}
            type="link"
            onClick={handleGoBack}
            style={{ color: "white", fontSize: "16px", padding: 0 }}
          />
           
        </div>
      </Header>

      <Content
        style={{
          padding: "20px 50px",
          marginTop: 30,
          background: "#fff",
          flex: 1,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}
