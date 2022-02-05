import { NgModule } from '@angular/core';
import { AppCommonModule } from '../common/app-common.module';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [LoginComponent],
    exports: [LoginComponent],
    imports: [AppCommonModule],
})
export class AuthModule {}
