import { List, DataTable, Edit, Show, SimpleShowLayout, SimpleForm, TextInput, useGetList } from "react-admin";

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
            <TextInput source="folio" label="Folio" />
            <TextInput source="tipo" label="Tipo" />
            <TextInput source="gravedad" label="Gravedad" />
            <TextInput source="fechaHoraLlamada" label="Fecha/hora llamada" />
            <TextInput source="fechaHoraArribo" label="Fecha/hora arribo" />
            <TextInput source="ubicacion" label="Ubicación" />
            <TextInput source="lugarOcurrencia" label="Lugar de ocurrencia" />
            <TextInput source="ambulancia" label="Ambulancia" />
            <TextInput source="paramedico" label="Paramédico" />
            <TextInput source="observaciones" label="Observaciones" />
            <TextInput source="creadoPor" label="Creado por" />
        </SimpleShowLayout>
    </Show>
);