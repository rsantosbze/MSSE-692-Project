import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/common/material/material.module';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { CommonsModule } from './../../../common/commons.module';

import { MatSnackBar } from '@angular/material/snack-bar';
import { DBOperation } from 'src/app/interfaces/DBOperations';
import { ManageAssetComponent } from './manage.asset.component';

describe('Manage.AssetComponent', () => {
  let component: ManageAssetComponent;
  let fixture: ComponentFixture<ManageAssetComponent>;
  const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ManageAssetComponent],
        imports: [CommonsModule, MaterialModule, ReactiveFormsModule],
        providers: [
            { provide: MatDialogRef, useValue: {} },
            { provide: SnackBarService, useValue: snackBarServiceSpy },
            { provide: MatSnackBar, useValue: {} },
            FormBuilder,
        ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAssetComponent);
    component = fixture.componentInstance;
    component.dbops = DBOperation.create;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
