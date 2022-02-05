import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/index';
import { MaintenanceRecordComponent } from './index';

export const MaintenanceRecordRoutes: Routes = [
    {
        canActivate: [AuthGuard],
        component: MaintenanceRecordComponent,
        path: 'maintenance-record',
    },
];
