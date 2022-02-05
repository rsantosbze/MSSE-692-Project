import { Routes } from '@angular/router';
import { AuthGuard } from '../../../auth/index';
import { HomeComponent } from './home.component';

export const HomeRoutes: Routes = [
    {

        component: HomeComponent,
        path: 'home',
    },
];
