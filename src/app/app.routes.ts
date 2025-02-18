import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
            {
                path: 'overview',
                loadComponent: () => import('./features/dashboard/page-overview/page-overview.component').then(m => m.PageOverviewComponent)

            },
            {
                path: 'air-quality',
                loadComponent: () => import('./features/dashboard/page-air-quality/page-air-quality.component').then(m => m.PageAirQualityComponent)
            },
            {
                path: '**',
                redirectTo: 'air-quality',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'

    }
];
