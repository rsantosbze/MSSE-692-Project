import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../common/app-common.module';

import { ManageOrganizationComponent, OrganizationComponent } from './index';

@NgModule({
    declarations: [ManageOrganizationComponent, OrganizationComponent],
    imports: [AppCommonModule, RouterModule],

    entryComponents: [ManageOrganizationComponent],
    exports: [OrganizationComponent],
})
export class OrganizationModule {}
