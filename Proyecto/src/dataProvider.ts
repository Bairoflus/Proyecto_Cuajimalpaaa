// import jsonServerProvider from 'ra-data-json-server';

// export const dataProvider = jsonServerProvider(
//     import.meta.env.VITE_JSON_SERVER_URL
// );

import { DataProvider } from 'react-admin';

// Mock data para reportes
const mockReports = [
    // Reportes del turno 1
    {
        id: 1,
        folio: "2024-001",
        tipo: "prehospitalaria",
        gravedad: "alta",
        fechaHoraLlamada: "2024-01-15T08:30:00Z",
        fechaHoraArribo: "2024-01-15T08:45:00Z",
        fechaHoraCierre: "2024-01-15T10:30:00Z",
        ubicacion: "Colonia Centro, Cuajimalpa",
        lugarOcurrencia: "Domicilio particular",
        ambulancia: "AMB-001",
        paramedico: "Dr. Carlos Mendoza",
        observaciones: "Paciente estable tras tratamiento inicial",
        observacionesJefe: "Caso aprobado, manejo adecuado",
        creadoPor: "paramedico1",
        turnoCreacion: "1",
        casoAprobado: true,
        requiereRevision: false
    },
    {
        id: 2,
        folio: "2024-002",
        tipo: "urbana",
        gravedad: "media",
        fechaHoraLlamada: "2024-01-15T14:20:00Z",
        fechaHoraArribo: "2024-01-15T14:35:00Z",
        fechaHoraCierre: null,
        ubicacion: "Parque Central, Cuajimalpa",
        lugarOcurrencia: "Área pública",
        ambulancia: "AMB-002",
        paramedico: "Lic. Ana Torres",
        observaciones: "Lesión menor, no requiere traslado",
        observacionesJefe: null,
        creadoPor: "operador1",
        turnoCreacion: "1",
        casoAprobado: false,
        requiereRevision: false
    },
    {
        id: 3,
        folio: null,
        tipo: "prehospitalaria",
        gravedad: "alta",
        fechaHoraLlamada: "2024-01-15T16:45:00Z",
        fechaHoraArribo: "2024-01-15T17:00:00Z",
        fechaHoraCierre: null,
        ubicacion: "Carretera México-Toluca km 15",
        lugarOcurrencia: "Vía pública",
        ambulancia: "AMB-003",
        paramedico: "Dr. Carlos Mendoza",
        observaciones: "Paciente politraumatizado, traslado prioritario",
        observacionesJefe: null,
        creadoPor: "paramedico1",
        turnoCreacion: "1",
        casoAprobado: false,
        requiereRevision: true
    },

    // Reportes del turno 2
    {
        id: 4,
        folio: "2024-003",
        tipo: "prehospitalaria",
        gravedad: "baja",
        fechaHoraLlamada: "2024-01-15T20:15:00Z",
        fechaHoraArribo: "2024-01-15T20:30:00Z",
        fechaHoraCierre: "2024-01-15T21:15:00Z",
        ubicacion: "Colonia San Mateo, Cuajimalpa",
        lugarOcurrencia: "Domicilio particular",
        ambulancia: "AMB-001",
        paramedico: "Lic. Carmen Vega",
        observaciones: "Paciente diabético, glucemia estabilizada",
        observacionesJefe: "Caso aprobado",
        creadoPor: "paramedico2",
        turnoCreacion: "2",
        casoAprobado: true,
        requiereRevision: false
    },
    {
        id: 5,
        folio: null,
        tipo: "urbana",
        gravedad: "media",
        fechaHoraLlamada: "2024-01-15T22:30:00Z",
        fechaHoraArribo: "2024-01-15T22:45:00Z",
        fechaHoraCierre: null,
        ubicacion: "Centro Comercial Cuajimalpa",
        lugarOcurrencia: "Establecimiento comercial",
        ambulancia: "AMB-004",
        paramedico: "Dr. Patricia Morales",
        observaciones: "Desmayo por calor, hidratación aplicada",
        observacionesJefe: null,
        creadoPor: "operador2",
        turnoCreacion: "2",
        casoAprobado: false,
        requiereRevision: false
    },
    {
        id: 6,
        folio: "2024-004",
        tipo: "prehospitalaria",
        gravedad: "alta",
        fechaHoraLlamada: "2024-01-16T02:15:00Z",
        fechaHoraArribo: "2024-01-16T02:30:00Z",
        fechaHoraCierre: "2024-01-16T04:00:00Z",
        ubicacion: "Zona Industrial, Cuajimalpa",
        lugarOcurrencia: "Centro de trabajo",
        ambulancia: "AMB-002",
        paramedico: "Lic. Miguel Ángel",
        observaciones: "Lesión en brazo por maquinaria, hemorragia controlada",
        observacionesJefe: "Caso aprobado, atención oportuna",
        creadoPor: "paramedico2",
        turnoCreacion: "2",
        casoAprobado: true,
        requiereRevision: false
    },
    {
        id: 7,
        folio: null,
        tipo: "prehospitalaria",
        gravedad: "media",
        fechaHoraLlamada: "2024-01-16T08:45:00Z",
        fechaHoraArribo: "2024-01-16T09:00:00Z",
        fechaHoraCierre: null,
        ubicacion: "Escuela Primaria, Cuajimalpa",
        lugarOcurrencia: "Institución educativa",
        ambulancia: "AMB-003",
        paramedico: "Dr. Carlos Mendoza",
        observaciones: "Fractura posible en brazo izquierdo",
        observacionesJefe: null,
        creadoPor: "paramedico1",
        turnoCreacion: "1",
        casoAprobado: false,
        requiereRevision: false
    },
    {
        id: 8,
        folio: "2024-005",
        tipo: "urbana",
        gravedad: "baja",
        fechaHoraLlamada: "2024-01-16T12:30:00Z",
        fechaHoraArribo: "2024-01-16T12:45:00Z",
        fechaHoraCierre: "2024-01-16T13:15:00Z",
        ubicacion: "Mercado Municipal, Cuajimalpa",
        lugarOcurrencia: "Establecimiento comercial",
        ambulancia: "AMB-001",
        paramedico: "Lic. Ana Torres",
        observaciones: "Presión arterial elevada, medicamento aplicado",
        observacionesJefe: "Caso cerrado, no requiere seguimiento",
        creadoPor: "operador1",
        turnoCreacion: "1",
        casoAprobado: true,
        requiereRevision: false
    }
];

// Función para filtrar reportes según el rol
const filterByRole = (reports: any[]) => {
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const turno = localStorage.getItem('turno');

    switch (role) {
        case 'admin':
            return reports; // Admin ve todos
        case 'jefe':
            return reports.filter(r => r.turnoCreacion === turno); // Jefe ve su turno
        case 'paramedico':
        case 'operador':
            return reports.filter(r => r.creadoPor === username); // Paramédico ve solo los suyos
        default:
            return reports;
    }
};

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        let reports = [...mockReports] as any[];
        
        // Filtrar por rol
        reports = filterByRole(reports);
        
        // Aplicar filtros de búsqueda
        if (params.filter) {
            reports = reports.filter(report => {
                return Object.entries(params.filter).every(([key, value]) => {
                    if (!value) return true;
                    return report[key]?.toString().toLowerCase().includes(value);
                });
            });
        }
        
        // Paginación
        const { page = 1, perPage = 25 } = params.pagination || {};
        const start = (page - 1) * perPage;
        const end = start + perPage;
        
        return {
            data: reports.slice(start, end),
            total: reports.length
        };
    },

    getOne: async (resource, params) => {
        let reports = filterByRole([...mockReports] as any[]);
        const report = reports.find(r => r.id === Number(params.id));
        
        if (!report) {
            throw new Error('Reporte no encontrado');
        }
        
        return { data: report };
    },

    getMany: async (resource, params) => {
        let reports = filterByRole([...mockReports] as any[]);
        return { 
            data: reports.filter(r => params.ids.map(Number).includes(r.id))
        };
    },

    getManyReference: async () => ({ data: [], total: 0 }),
    
    create: async (resource, params): Promise<{data: any}> => {
        const newId = Math.max(...mockReports.map(r => r.id)) + 1;
        const newReport = {
            id: newId,
            ...params.data,
            creadoPor: localStorage.getItem('username'),
            turnoCreacion: localStorage.getItem('turno')
        };
        
        // Simular creación (en realidad se guardaría en BD)
        console.log('Nuevo reporte:', newReport);
        
        return { data: newReport };
    },

    update: async (resource, params): Promise<{data: any}> => {
        // Buscar y actualizar el reporte en mockReports
        const index = mockReports.findIndex(r => r.id === Number(params.id));
        if (index !== -1) {
            mockReports[index] = { ...mockReports[index], ...params.data };
        }
        
        console.log('Actualizando reporte:', params.data);
        return { data: params.data };
    },

    updateMany: async (resource, params) => {
        return { data: params.ids };
    },

    delete: async (resource, params): Promise<{data: any}> => {
        const index = mockReports.findIndex(r => r.id === Number(params.id));
        if (index !== -1) {
            mockReports.splice(index, 1);
        }
        
        console.log('Eliminando reporte:', params.id);
        return { data: { id: params.id } };
    },

    deleteMany: async (resource, params) => {
        params.ids.forEach(id => {
            const index = mockReports.findIndex(r => r.id === Number(id));
            if (index !== -1) {
                mockReports.splice(index, 1);
            }
        });
        return { data: params.ids };
    },
};