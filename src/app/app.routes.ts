import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth-routes').then(m => m.authRoutes)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard-routes').then(m => m.dashboradRoutes)
    },
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    }

];
