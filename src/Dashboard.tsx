// src/Dashboard.tsx
import { Card, CardContent, CardHeader } from "@mui/material";
import { usePermissions } from "react-admin";

export const Dashboard = () => {
    const { permissions, isLoading } = usePermissions();

    if (isLoading) {
        return null; // o <div>Cargando permisos...</div>
    }

    if (permissions !== "admin") {
        return (
            <Card>
                <CardHeader title="Acceso restringido" />
                <CardContent>No tienes permiso para ver el Dashboard.</CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader title="Bienvenido a la administración" />
            <CardContent>Lorem ipsum sic dolor amet...</CardContent>
        </Card>
    );
};
