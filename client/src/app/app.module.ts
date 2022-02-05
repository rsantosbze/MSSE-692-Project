import { AssetModule } from './ams/asset/asset.module';
import { MaintenanceRecordModule } from './ams/maintenance-record/maintenance-record.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppCommonModule } from '../app/common/index';
import { HomeModule, OrganizationModule } from './ams/index';
import { UserModule } from './ams/index';
import { RegisterModule } from './ams/index';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/index';
import { errorInterceptorProvider } from './auth/service/error.interceptor';
import { jwtInterceptorProvider } from './auth/service/jwt-interceptor';
import { CommonsModule } from './common/index';

import { GraphQLModule } from './graphql.module';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        AuthModule,
        AppCommonModule,
        CommonsModule,
        GraphQLModule,
        HomeModule,
        RegisterModule,
        UserModule,
        OrganizationModule,
        AssetModule,
        MaintenanceRecordModule,
    ],
    providers: [jwtInterceptorProvider, { provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppModule {}
