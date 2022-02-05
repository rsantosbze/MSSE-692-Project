import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/index';
import { OrganizationComponent } from './index';

export const OrganizationRoutes: Routes = [
    {
        canActivate: [AuthGuard],
        component: OrganizationComponent,
        path: 'organization',
    },
];
