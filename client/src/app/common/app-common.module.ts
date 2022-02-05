import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';

@NgModule({
    declarations: [],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule, MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
})
export class AppCommonModule {}
