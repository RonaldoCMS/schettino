"use client";

import { AuthProvider } from "@/context/AuthContext";
import { Layout } from "antd";
import { Footer } from "antd/es/layout/layout";

export default function AuthProviderComponent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <AuthProvider>{children}</AuthProvider>
            <Footer style={{ textAlign: "center", marginTop: "auto" }}>
                RonaldoCMS ©2024
            </Footer>
        </Layout>
    );
}
