import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/common/material/material.module';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { CommonsModule } from './../../../common/commons.module';

import { MatSnackBar } from '@angular/material/snack-bar';
import { DBOperation } from 'src/app/interfaces/DBOperations';

import { ManageMaintenanceRecordComponent } from './manage.maintenance-record.component';

describe('Manage.MaintenanceRecordComponent', () => {
  let component: ManageMaintenanceRecordComponent;
  let fixture: ComponentFixture<ManageMaintenanceRecordComponent>;
  const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ManageMaintenanceRecordComponent],
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
    fixture = TestBed.createComponent(ManageMaintenanceRecordComponent);
    component = fixture.componentInstance;
    component.dbops = DBOperation.create;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
