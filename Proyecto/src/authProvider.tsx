import { AuthProvider } from "react-admin";

// Definición de usuarios del sistema con turnos
const usuarios = {
    "admin": { password: "admin123", role: "admin", turno: null },
    "jefe1": { password: "jefe123", role: "jefe", turno: "1" },
    "jefe2": { password: "jefe123", role: "jefe", turno: "2" },
    "operador1": { password: "operador123", role: "operador", turno: "1" },
    "operador2": { password: "operador123", role: "operador", turno: "2" },
    "paramedico1": { password: "paramedico123", role: "paramedico", turno: "1" },
    "paramedico2": { password: "paramedico123", role: "paramedico", turno: "2" }
};

export const authProvider: AuthProvider = {
    // llamado cuando el usuario intenta iniciar sesión
    async login({ username, password }) {
        const usuario = usuarios[username as keyof typeof usuarios];
        
        if (usuario && usuario.password === password) {
            localStorage.setItem("username", username);
            // Estableciendo el rol del usuario; en una aplicación real, esto vendría del backend
            localStorage.setItem("role", usuario.role);
            localStorage.setItem("turno", usuario.turno || "");
        }
        else {
            throw new Error("Credenciales inválidas, por favor intenta de nuevo");
        }
    },
    // llamado cuando el usuario hace clic en el botón de cerrar sesión
    async logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("turno");
    },
    // llamado cuando la API devuelve un error
    async checkError({ status }: { status: number }) {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            localStorage.removeItem("turno");
            throw new Error("Sesión expirada");
        }
    },
    // llamado cuando el usuario navega a una nueva ubicación, para verificar la autenticación
    async checkAuth() {
        if (!localStorage.getItem("username")) {
            throw new Error("Autenticación requerida");
        }
    },
    // llamado para obtener los permisos del usuario
    async getPermissions() {
        return localStorage.getItem("role");
    },
};