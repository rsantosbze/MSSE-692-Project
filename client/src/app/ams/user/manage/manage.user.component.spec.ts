import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/interfaces';
import { CommonsModule } from './../../../common/commons.module';
import { MaterialModule } from './../../../common/material/material.module';
import { DBOperation } from './../../../interfaces/DBOperations';
import { SnackBarService } from './../../../services/snack-bar.service';
import { ManageUserComponent } from './manage.user.component';

describe('Manage.UserComponent', () => {
  let component: ManageUserComponent;
  let fixture: ComponentFixture<ManageUserComponent>;
  let el: DebugElement;
  const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);
  beforeEach(waitForAsync (() => {
       TestBed.configureTestingModule({
        declarations: [ManageUserComponent],
        imports: [CommonsModule, MaterialModule, ReactiveFormsModule],
        providers: [
            { provide: MatDialogRef, useValue: {} },
            { provide: SnackBarService, useValue: snackBarServiceSpy },
            { provide: MatSnackBar, useValue: {} },
            FormBuilder,

        ],
    })
        .compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(ManageUserComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
        });
  }));

  beforeEach(() => {
    // const user: IUser = {
    //   _id: '60d73edef21f79c06cb1597c',
    //   firstName: 'Rolando',
    //   lastName: 'Santos',
    //   email: 'rjsaint@yahoo.com',
    //   role: 'ADMIN',
    //   status: true,
    //   username: 'testuser',
    // };
    // component.iuser = user;
    component.dbops = DBOperation.create;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
