import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

/**
 * Definición de las rutas de la aplicación.
 */
export const routes: Routes = [
    // Ruta para el componente de inicio de sesión
    { path: 'login', component: LoginComponent },
    
    // Ruta para el componente de registro
    { path: 'register', component: RegisterComponent },
    
    // Redirección a la ruta de inicio de sesión si la ruta está vacía
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    
    // Ruta para el componente del tablero (dashboard)
    { path: 'dashboard', component: DashboardComponent },
];
