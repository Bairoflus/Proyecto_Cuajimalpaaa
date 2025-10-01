// src/Dashboard.tsx
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
    Box,
    Chip,
    LinearProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import { usePermissions } from "react-admin";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AmbulanceIcon from '@mui/icons-material/AirportShuttle';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import TimerIcon from '@mui/icons-material/Timer';

// Mock data para el dashboard
const dashboardData = {
    metricas: {
        totalReportes: 156,
        casosActivos: 12,
        tiempoPromedioRespuesta: 11, // minutos
        ambulanciasDisponibles: 8,
        personalActivo: 24
    },
    porTurno: {
        turno1: {
            nombre: "1er Turno",
            horario: "L-V | 08:00-15:00",
            reportes: 32,
            casosActivos: 2,
            tiempoPromedio: 10
        },
        turno2: {
            nombre: "2do Turno",
            horario: "L-V | 15:00-21:00",
            reportes: 28,
            casosActivos: 3,
            tiempoPromedio: 12
        },
        turno3: {
            nombre: "3er Turno",
            horario: "L,Mi,V | 21:00-08:00",
            reportes: 18,
            casosActivos: 2,
            tiempoPromedio: 9
        },
        turno4: {
            nombre: "4to Turno",
            horario: "Ma,Ju,Do | 21:00-08:00",
            reportes: 22,
            casosActivos: 1,
            tiempoPromedio: 11
        },
        turno5: {
            nombre: "5to Turno",
            horario: "S,D,Festivos | 08:00-20:00",
            reportes: 31,
            casosActivos: 3,
            tiempoPromedio: 13
        },
        turno6: {
            nombre: "6to Turno",
            horario: "S,D,Festivos | 20:00-08:00",
            reportes: 25,
            casosActivos: 1,
            tiempoPromedio: 10
        }
    },
    reportesRecientes: [
        {
            id: 101,
            folio: "2024-047",
            tipo: "prehospitalaria",
            gravedad: "alta",
            ubicacion: "Av. Constituyentes km 8",
            estado: "en_proceso",
            tiempoTranscurrido: "25 min"
        },
        {
            id: 102,
            folio: "2024-046",
            tipo: "urbana",
            gravedad: "media",
            ubicacion: "Colonia Rosa Torres",
            estado: "cerrado",
            tiempoTranscurrido: "Completado"
        },
        {
            id: 103,
            folio: null,
            tipo: "prehospitalaria",
            gravedad: "alta",
            ubicacion: "Carretera Toluca km 22",
            estado: "requiere_revision",
            tiempoTranscurrido: "45 min"
        }
    ],
    estadisticasSemanales: {
        lunes: 8,
        martes: 6,
        miercoles: 9,
        jueves: 7,
        viernes: 10,
        sabado: 4,
        domingo: 3
    },
    tiposEmergencia: {
        prehospitalaria: 28,
        urbana: 15,
        otro: 4
    },
    ambulancias: [
        { id: "AMB-001", estado: "disponible", ubicacion: "Base Central" },
        { id: "AMB-002", estado: "en_servicio", ubicacion: "Colonia Centro" },
        { id: "AMB-003", estado: "disponible", ubicacion: "Base Norte" },
        { id: "AMB-004", estado: "mantenimiento", ubicacion: "Taller" },
        { id: "AMB-005", estado: "disponible", ubicacion: "Base Sur" },
        { id: "AMB-006", estado: "en_servicio", ubicacion: "Carretera Toluca" }
    ],
    alertas: [
        {
            tipo: "critico",
            mensaje: "Caso ID-103 lleva más de 40 minutos sin cierre",
            tiempo: "hace 5 min"
        },
        {
            tipo: "advertencia",
            mensaje: "Solo 3 ambulancias disponibles en turno 2",
            tiempo: "hace 15 min"
        }
    ]
};

const MetricCard = ({ title, value, icon, color = "primary", subtitle }: any) => (
    <Card elevation={2}>
        <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div" color={color}>
                        {value}
                    </Typography>
                    {subtitle && (
                        <Typography variant="body2" color="textSecondary">
                            {subtitle}
                        </Typography>
                    )}
                </Box>
                <Box color={color === "primary" ? "primary.main" : `${color}.main`}>
                    {icon}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const getEstadoColor = (estado: string) => {
    switch (estado) {
        case 'disponible': return 'success';
        case 'en_servicio': return 'warning';
        case 'mantenimiento': return 'error';
        default: return 'default';
    }
};

const getGravedadColor = (gravedad: string) => {
    switch (gravedad) {
        case 'alta': return 'error';
        case 'media': return 'warning';
        case 'baja': return 'success';
        default: return 'default';
    }
};

export const Dashboard = () => {
    const { permissions, isLoading } = usePermissions();

    if (isLoading) {
        return null;
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
        <Box p={2}>
            {/* Header */}
            <Typography variant="h4" gutterBottom>
                Dashboard de Emergencias - Cuajimalpa
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Sistema de gestión de reportes de emergencias médicas
            </Typography>

            {/* Alertas importantes */}
            <Box mb={3}>
                {dashboardData.alertas.map((alerta, index) => (
                    <Alert
                        key={index}
                        severity={alerta.tipo === "critico" ? "error" : "warning"}
                        icon={<WarningIcon />}
                        sx={{ mb: 1 }}
                    >
                        <strong>{alerta.mensaje}</strong> - {alerta.tiempo}
                    </Alert>
                ))}
            </Box>

            {/* Métricas principales */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={2.4}>
                    <MetricCard
                        title="Total Reportes"
                        value={dashboardData.metricas.totalReportes}
                        icon={<LocalHospitalIcon fontSize="large" />}
                        subtitle="Este mes"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                    <MetricCard
                        title="Casos Activos"
                        value={dashboardData.metricas.casosActivos}
                        icon={<PendingIcon fontSize="large" />}
                        color="warning"
                        subtitle="Sin cerrar"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                    <MetricCard
                        title="Tiempo Promedio"
                        value={`${dashboardData.metricas.tiempoPromedioRespuesta} min`}
                        icon={<TimerIcon fontSize="large" />}
                        color="info"
                        subtitle="Respuesta"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                    <MetricCard
                        title="Ambulancias"
                        value={dashboardData.metricas.ambulanciasDisponibles}
                        icon={<AmbulanceIcon fontSize="large" />}
                        color="success"
                        subtitle="Disponibles"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                    <MetricCard
                        title="Personal Activo"
                        value={dashboardData.metricas.personalActivo}
                        icon={<PeopleIcon fontSize="large" />}
                        subtitle="En turno"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Comparación por turnos */}
                <Grid item xs={12} md={8}>
                    <Card elevation={2}>
                        <CardHeader title="Rendimiento por Turno" />
                        <CardContent>
                            {Object.entries(dashboardData.porTurno).map(([key, turno], index) => (
                                <Box key={key} mb={2}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        {turno.nombre} ({turno.horario})
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                        <Typography variant="body2">Reportes: {turno.reportes}</Typography>
                                        <Typography variant="body2">Activos: {turno.casosActivos}</Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(turno.reportes / dashboardData.metricas.totalReportes) * 100}
                                        color={index % 2 === 0 ? "primary" : "secondary"}
                                        sx={{ mb: 1 }}
                                    />
                                    <Typography variant="caption" color="textSecondary">
                                        Tiempo promedio: {turno.tiempoPromedio} min
                                    </Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Estado de ambulancias */}
                <Grid item xs={12} md={4}>
                    <Card elevation={2}>
                        <CardHeader title="Estado de Ambulancias" />
                        <CardContent>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Ambulancia</TableCell>
                                            <TableCell>Estado</TableCell>
                                            <TableCell>Ubicación</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dashboardData.ambulancias.map((ambulancia) => (
                                            <TableRow key={ambulancia.id}>
                                                <TableCell>{ambulancia.id}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={ambulancia.estado.replace('_', ' ')}
                                                        color={getEstadoColor(ambulancia.estado) as any}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell>{ambulancia.ubicacion}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Reportes recientes */}
                <Grid item xs={12}>
                    <Card elevation={2}>
                        <CardHeader title="Reportes Recientes" />
                        <CardContent>
                            <TableContainer component={Paper} variant="outlined">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Folio</TableCell>
                                            <TableCell>Tipo</TableCell>
                                            <TableCell>Gravedad</TableCell>
                                            <TableCell>Ubicación</TableCell>
                                            <TableCell>Estado</TableCell>
                                            <TableCell>Tiempo</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dashboardData.reportesRecientes.map((reporte) => (
                                            <TableRow key={reporte.id}>
                                                <TableCell>{reporte.id}</TableCell>
                                                <TableCell>{reporte.folio || "Sin asignar"}</TableCell>
                                                <TableCell>{reporte.tipo}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={reporte.gravedad}
                                                        color={getGravedadColor(reporte.gravedad) as any}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell>{reporte.ubicacion}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={reporte.estado.replace('_', ' ')}
                                                        color={reporte.estado === "cerrado" ? "success" : reporte.estado === "requiere_revision" ? "error" : "warning"}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell>{reporte.tiempoTranscurrido}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
