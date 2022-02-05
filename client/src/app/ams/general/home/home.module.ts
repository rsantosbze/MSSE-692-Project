import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../../common/app-common.module';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [ HomeComponent],
  imports: [
    AppCommonModule,
    RouterModule,

  ],
})
export class HomeModule {}
