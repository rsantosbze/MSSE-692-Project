import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from './app-common.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
    declarations: [MainNavComponent, SnackBarComponent],
    imports: [AppCommonModule, RouterModule],

    exports: [MainNavComponent, SnackBarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommonsModule {}
