import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetRoutes, HomeRoutes, MaintenanceRecordRoutes, OrganizationRoutes, RegisterRoutes, UserRoutes} from './ams/index';

import { AuthRoutes } from './auth/auth.routes';

const routes: Routes = [

  ...UserRoutes,
  ...AuthRoutes,
  ...HomeRoutes,
  ...RegisterRoutes,
  ...OrganizationRoutes,
  ...AssetRoutes,
  ...MaintenanceRecordRoutes,

    { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],

})
export class AppRoutingModule { }
