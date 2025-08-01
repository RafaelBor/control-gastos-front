import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register/register.component')
            },
            {
                path: 'verificar-email',
                loadComponent: () => import('./pages/verify-email/verify-email.component').then(m => m.VerifyEmailComponent)
            }
        ]

    },
    {
        path: '**',
        redirectTo: 'login',
    }

];