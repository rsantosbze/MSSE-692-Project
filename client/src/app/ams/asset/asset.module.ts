import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../common/app-common.module';

import { AssetComponent, ManageAssetComponent } from './index';

@NgModule({
    declarations: [ManageAssetComponent, AssetComponent],
    imports: [AppCommonModule, RouterModule],

    entryComponents: [ManageAssetComponent],
    exports: [AssetComponent],
})
export class AssetModule {}
