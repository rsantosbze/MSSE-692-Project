import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../common/app-common.module';

import {
  ManageUserComponent,
  UserComponent,
} from './index';

@NgModule({
  declarations: [
    ManageUserComponent,
    UserComponent,

  ],
  imports: [
    AppCommonModule,
    RouterModule,

  ],

  entryComponents: [ManageUserComponent],
  exports: [UserComponent],
})
export class UserModule {}
