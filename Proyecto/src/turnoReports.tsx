import { List, DataTable, Edit, Show, SimpleShowLayout, SimpleForm, TextInput, FormDataConsumer, BooleanInput, TextField, DateField } from "react-admin";

// Lista de reportes del turno para jefes
export const TurnoReportsList = () => {
    const turno = localStorage.getItem("turno");
    
    return (
        <List filter={{ turnoCreacion: turno }} title={`Reportes del Turno ${turno}`}>
            <DataTable rowClick="edit">
                <DataTable.Col source="id" label="ID" />
                <DataTable.Col source="folio" label="Folio" />
                <DataTable.Col source="tipo" label="Tipo" />
                <DataTable.Col source="fechaHoraLlamada" label="Llamada" />
                <DataTable.Col source="ubicacion" label="Ubicación" />
                <DataTable.Col source="gravedad" label="Gravedad" />
                <DataTable.Col source="ambulancia" label="Ambulancia" />
                <DataTable.Col source="paramedico" label="Paramédico" />
                <DataTable.Col source="creadoPor" label="Creado por" />
                <DataTable.Col source="fechaHoraCierre" label="Cerrado" />
            </DataTable>
        </List>
    );
};

// Edición de reportes para jefes (pueden cerrar casos y asignar folios)
export const TurnoReportEdit = () => (
    <Edit>
        <SimpleForm>
            {/* Información básica (solo lectura) */}
            <TextInput source="tipo" label="Tipo" disabled />
            <TextInput source="gravedad" label="Gravedad" disabled />
            <TextInput source="fechaHoraLlamada" label="Fecha/hora llamada" disabled />
            <TextInput source="ubicacion" label="Ubicación" disabled />
            <TextInput source="creadoPor" label="Creado por" disabled />
            
            {/* Campos que el jefe puede editar */}
            <TextInput source="folio" label="Folio (asignar para cerrar caso)" />
            <TextInput source="fechaHoraCierre" label="Fecha/hora de cierre" />
            <TextInput source="observacionesJefe" label="Observaciones del jefe" multiline fullWidth />
            <BooleanInput source="casoAprobado" label="Caso aprobado" />
            <BooleanInput source="requiereRevision" label="Requiere revisión adicional" />
        </SimpleForm>
    </Edit>
);

// Vista completa para jefes
export const TurnoReportShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="folio" label="Folio" />
            <TextField source="tipo" label="Tipo" />
            <TextField source="gravedad" label="Gravedad" />
            <DateField source="fechaHoraLlamada" label="Fecha/hora llamada" showTime />
            <DateField source="fechaHoraArribo" label="Fecha/hora arribo" showTime />
            <DateField source="fechaHoraCierre" label="Fecha/hora cierre" showTime />
            <TextField source="ubicacion" label="Ubicación" />
            <TextField source="ambulancia" label="Ambulancia" />
            <TextField source="paramedico" label="Paramédico" />
            <TextField source="observaciones" label="Observaciones" />
            <TextField source="observacionesJefe" label="Observaciones del jefe" />
            <TextField source="creadoPor" label="Creado por" />
            <TextField source="turnoCreacion" label="Turno" />
        </SimpleShowLayout>
    </Show>
);