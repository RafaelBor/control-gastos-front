import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticationGuard } from './auth/guards/is-not-authentication.guard';

export const routes: Routes = [
    {
        path: 'auth',
        canActivate: [isNotAuthenticationGuard],
        loadChildren: () => import('./auth/auth-routes').then(m => m.authRoutes)
    },
    {
        path: 'dashboard',
        canActivate: [isAuthenticatedGuard],
        loadChildren: () => import('./dashboard/dashboard-routes').then(m => m.dashboradRoutes)
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    }

];
