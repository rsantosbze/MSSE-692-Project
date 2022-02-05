import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../common/app-common.module';

import { MaintenanceRecordComponent, ManageMaintenanceRecordComponent } from './index';

@NgModule({
    declarations: [ManageMaintenanceRecordComponent, MaintenanceRecordComponent],
    imports: [AppCommonModule, RouterModule],

    entryComponents: [ManageMaintenanceRecordComponent],
    exports: [MaintenanceRecordComponent],
})
export class MaintenanceRecordModule {}
