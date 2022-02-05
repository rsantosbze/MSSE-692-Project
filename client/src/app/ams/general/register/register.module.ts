
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../../common/app-common.module';

import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [ RegisterComponent],
  imports: [
    AppCommonModule,
    RouterModule,

  ],
})
export class RegisterModule {}
