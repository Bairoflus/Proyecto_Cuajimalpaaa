import {
    List, DataTable, Edit, Create, Show, SimpleShowLayout,
    SimpleForm, TextInput, NumberInput, DateTimeInput, SelectInput,
    BooleanInput, Toolbar, SaveButton, required, minValue, FormDataConsumer
} from "react-admin";
import { Card, CardContent } from "@mui/material";

const tiposReporte = [
    { id: "prehospitalaria", name: "Emergencia prehospitalaria" },
    { id: "urbana", name: "Emergencia urbana" },
    { id: "otro", name: "Otro" },
];

const gravedades = [
    { id: "baja", name: "Baja" },
    { id: "media", name: "Media" },
    { id: "alta", name: "Alta" },
];

const validaPositivo = [required(), minValue(0)];

const OnlyAdminNote = () => {
    const role = localStorage.getItem("role");
    if (role === "admin") return null;
    return (
        <Card variant="outlined" className="mb-2">
            <CardContent style={{ fontSize: 14 }}>
                Nota: El <b>folio</b> es consecutivo y lo genera el administrador al cerrar el caso.
            </CardContent>
        </Card>
    );
};

const ReportToolbar = (props: any) => (
    <Toolbar {...props}>
        <SaveButton alwaysEnable />
    </Toolbar>
);

export const ReportList = () => (
    <List>
        <DataTable rowClick="edit">
            <DataTable.Col source="id" label="ID" />
            <DataTable.Col source="folio" label="Folio" />
            <DataTable.Col source="tipo" label="Tipo" />
            <DataTable.Col source="fechaHoraLlamada" label="Llamada" />
            <DataTable.Col source="ubicacion" label="Ubicación" />
            <DataTable.Col source="gravedad" label="Gravedad" />
            <DataTable.Col source="ambulancia" label="Ambulancia" />
            <DataTable.Col source="paramedico" label="Paramédico" />
            <DataTable.Col source="traslado.huboTraslado" label="Traslado" />
        </DataTable>
    </List>
);

export const ReportCreate = () => (
    <Create>
        <SimpleForm toolbar={<ReportToolbar />}>
            <OnlyAdminNote />

            {/* Identificación básica */}
            <SelectInput source="tipo" label="Tipo de reporte" choices={tiposReporte} validate={required()} />
            <SelectInput source="gravedad" label="Gravedad" choices={gravedades} validate={required()} />
            <DateTimeInput source="fechaHoraLlamada" label="Fecha/hora de la llamada" validate={required()} />
            <DateTimeInput source="fechaHoraArribo" label="Fecha/hora de arribo" />
            <DateTimeInput source="fechaHoraCierre" label="Fecha/hora de cierre (si aplica)" />

            <TextInput source="ubicacion" label="Ubicación del servicio" fullWidth validate={required()} />
            <TextInput source="lugarOcurrencia" label="Lugar de ocurrencia" fullWidth />

            {/* Recursos/unidad */}
            <TextInput source="ambulancia" label="Unidad/Ambulancia" validate={required()} />
            <TextInput source="entidadUnidad" label="Entidad a la que pertenece la unidad" />
            <TextInput source="paramedico" label="Paramédico a cargo" validate={required()} />
            <NumberInput source="kilometros" label="Km recorridos" defaultValue={0} validate={validaPositivo} />

            {/* Métricas de tiempo */}
            <NumberInput source="tiempoRespuestaMin" label="Tiempo de respuesta (min)" defaultValue={0} validate={validaPositivo} />
            <NumberInput source="tiempoAtencionMin" label="Tiempo de atención en sitio (min)" defaultValue={0} validate={validaPositivo} />
            <NumberInput source="tiempoTrasladoMin" label="Tiempo de traslado (min)" defaultValue={0} validate={validaPositivo} />

            {/* Dinámica por tipo de reporte */}
            <FormDataConsumer>
                {({ formData, ...rest }) => (
                    <>
                        {formData.tipo === "prehospitalaria" && (
                            <>
                                <TextInput source="paciente.nombre" label="Paciente: nombre" {...rest} />
                                <NumberInput source="paciente.edad" label="Paciente: edad" {...rest} validate={minValue(0)} />
                                <TextInput source="paciente.sexo" label="Paciente: sexo (M/F/X)" {...rest} />
                                <TextInput source="agenteCausal" label="Agente causal" {...rest} />
                                <TextInput source="insumos" label="Insumos suministrados (lista)" fullWidth {...rest} />
                                <TextInput source="insumosCantidades" label="Cantidades (ej. 'Vendaje=2, SSN=1')" fullWidth {...rest} />
                                <BooleanInput source="traslado.huboTraslado" label="¿Hubo traslado?" />
                                {formData?.traslado?.huboTraslado && (
                                    <>
                                        <TextInput source="traslado.hospital" label="Hospital de destino" {...rest} />
                                        <TextInput source="traslado.quienRecibe" label="¿Quién recibe?" {...rest} />
                                    </>
                                )}
                            </>
                        )}

                        {formData.tipo === "urbana" && (
                            <>
                                <TextInput source="descripcionEvento" label="Descripción del evento" fullWidth {...rest} />
                                <BooleanInput source="notaInformativa" label="¿Requiere nota informativa al municipio?" {...rest} />
                                <BooleanInput source="evidenciasFotograficas" label="¿Hay evidencias fotográficas?" {...rest} />
                            </>
                        )}
                    </>
                )}
            </FormDataConsumer>

            {/* Observaciones y control */}
            <TextInput source="observaciones" label="Observaciones" multiline fullWidth />

            {/* Folio: editable solo si role === admin */}
            <FormDataConsumer>
                {() => {
                    const role = localStorage.getItem("role");
                    if (role === "admin") {
                        return <TextInput source="folio" label="Folio (consecutivo)" helperText="Visible y editable solo para admin" />;
                    }
                    return null;
                }}
            </FormDataConsumer>

            {/* Flags */}
            <BooleanInput source="esFalsaAlarma" label="Falsa alarma (no genera reporte completo)" />
            <BooleanInput source="privadaLlegoAntes" label="Llegó privada antes (emitir solo nota)" />
        </SimpleForm>
    </Create>
);

export const ReportEdit = () => (
    <Edit>
        <SimpleForm toolbar={<ReportToolbar />}>
            {/* Reutilizamos los mismos campos que en Create */}
            <ReportCreate />
        </SimpleForm>
    </Edit>
);

export const ReportShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextInput source="folio" label="Folio" />
            <TextInput source="tipo" label="Tipo" />
            <TextInput source="gravedad" label="Gravedad" />
            <TextInput source="ubicacion" label="Ubicación" />
            <TextInput source="lugarOcurrencia" label="Lugar de ocurrencia" />
            <TextInput source="ambulancia" label="Ambulancia" />
            <TextInput source="paramedico" label="Paramédico" />
            <TextInput source="observaciones" label="Observaciones" />
        </SimpleShowLayout>
    </Show>
);
