import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/common/material/material.module';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { CommonsModule } from './../../common/commons.module';

import { MatSnackBar } from '@angular/material/snack-bar';

import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [CommonsModule, MaterialModule, ReactiveFormsModule, RouterTestingModule],
        providers: [
            { provide: MatDialogRef, useValue: {} },
            { provide: SnackBarService, useValue: snackBarServiceSpy },
            { provide: MatSnackBar, useValue: {} },
            FormBuilder,
        ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
