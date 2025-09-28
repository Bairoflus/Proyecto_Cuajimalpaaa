import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { ReportList, ReportCreate, ReportEdit, ReportShow } from './reports';
import { MyReportsList, MyReportShow } from './myReports';
import { TurnoReportsList, TurnoReportEdit, TurnoReportShow } from './turnoReports';
import { Layout } from './Layout';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { Dashboard } from './Dashboard';
import { authProvider } from './authProvider';
import { i18nProvider } from './i18nProvider';

const AppWithResources = () => {
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    
    return (
        <Admin key={username} layout={Layout} dataProvider={dataProvider} dashboard={role === 'admin' ? Dashboard : undefined} authProvider={authProvider} i18nProvider={i18nProvider}>
            {/* Admin: acceso completo */}
            {role === 'admin' && (
                <Resource
                    name="reports"
                    list={ReportList}
                    create={ReportCreate}
                    edit={ReportEdit}
                    show={ReportShow}
                    icon={LocalHospitalIcon}
                    options={{ label: 'Todos los Reportes' }}
                />
            )}
            
            {/* Jefe: reportes de su turno */}
            {role === 'jefe' && (
                <Resource
                    name="turno-reports"
                    list={TurnoReportsList}
                    edit={TurnoReportEdit}
                    show={TurnoReportShow}
                    create={ReportCreate}
                    icon={GroupIcon}
                    options={{ label: 'Reportes del Turno' }}
                />
            )}
            
            {/* Operador/Paramédico: crear reportes y ver solo los suyos */}
            {(role === 'operador' || role === 'paramedico') && (
                <>
                    <Resource
                        name="my-reports"
                        list={MyReportsList}
                        show={MyReportShow}
                        create={ReportCreate}
                        icon={PersonIcon}
                        options={{ label: 'Mis Reportes' }}
                    />
                </>
            )}
        </Admin>
    );
};

export const App = AppWithResources;