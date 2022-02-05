import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/index';
import { AssetComponent } from './index';

export const AssetRoutes: Routes = [
    {
        canActivate: [AuthGuard],
        component: AssetComponent,
        path: 'asset',
    },
];
