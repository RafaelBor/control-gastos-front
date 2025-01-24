import { Routes } from '@angular/router';

export const dashboradRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home.component')
            },
            {
                path: 'expenses',
                loadComponent: () => import('./pages/expenses/expenses.component')
            },
            {
                path: 'salary',
                loadComponent: () => import('./pages/salary/salary.component')
            }
        ],
    }
    
   

];