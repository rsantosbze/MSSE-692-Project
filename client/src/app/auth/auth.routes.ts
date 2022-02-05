import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { AuthGuard } from '../../services/auth.guard';

export const AuthRoutes: Routes = [
    {
        component: LoginComponent,
        path: 'login',
    },
];
