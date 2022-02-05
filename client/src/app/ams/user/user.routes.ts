import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/index';
import { UserComponent } from './index';

export const UserRoutes: Routes = [
    {
        canActivate: [AuthGuard],
        component: UserComponent,
        path: 'users',
    },
];
