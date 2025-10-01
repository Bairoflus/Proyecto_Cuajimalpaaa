import { List, DataTable, Show, SimpleShowLayout, TextField, DateField, BooleanField } from "react-admin";

// Lista de reportes filtrada por usuario
export const MyReportsList = () => {
    const username = localStorage.getItem("username");
    
    return (
        <List filter={{ creadoPor: username }} title="Mis Reportes">
            <DataTable rowClick="show">
                <DataTable.Col source="id" label="ID" />
                <DataTable.Col source="tipo" label="Tipo" />
                <DataTable.Col source="fechaHoraLlamada" label="Llamada" />
                <DataTable.Col source="ubicacion" label="Ubicación" />
                <DataTable.Col source="gravedad" label="Gravedad" />
                <DataTable.Col source="ambulancia" label="Ambulancia" />
                <DataTable.Col source="paramedico" label="Paramédico" />
            </DataTable>
        </List>
    );
};

// Vista de reporte individual (solo lectura para operadores/paramédicos)
export const MyReportShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="folio" label="Folio" />
            <TextField source="tipo" label="Tipo" />
            <TextField source="gravedad" label="Gravedad" />
            <DateField source="fechaHoraLlamada" label="Fecha/hora llamada" showTime />
            <DateField source="fechaHoraArribo" label="Fecha/hora arribo" showTime />
            <TextField source="ubicacion" label="Ubicación" />
            <TextField source="lugarOcurrencia" label="Lugar de ocurrencia" />
            <TextField source="ambulancia" label="Ambulancia" />
            <TextField source="paramedico" label="Paramédico" />
            <TextField source="observaciones" label="Observaciones" />
            <TextField source="creadoPor" label="Creado por" />
        </SimpleShowLayout>
    </Show>
);