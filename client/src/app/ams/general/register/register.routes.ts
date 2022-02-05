import { Routes } from '@angular/router';
import { AuthGuard } from '../../../auth/index';
import { RegisterComponent } from './register.component';

export const RegisterRoutes: Routes = [
    {

        component: RegisterComponent,
        path: 'register',
    },
];
