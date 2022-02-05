import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DBOperation } from 'src/app/interfaces/DBOperations';
import { IResponse, IUser } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import * as statement from '../grapql-statements';

@Component({
    selector: 'app-manage.user',
    styleUrls: ['./manage.user.component.css'],
    templateUrl: './manage.user.component.html',
})
export class ManageUserComponent implements OnInit, OnDestroy {
    public dbops!: DBOperation;
    public modalTitle!: string;
    public modalBtnTitle!: string;
    public iuser!: IUser;
    public user!: IUser;
    private msg!: string;
    public userForm: FormGroup;
    public enableButton = true;
    public hidePasswordInput = true;
    private iResponse: IResponse = { action: '', errorMsg: '' };
    private destroy$ = new Subject<void>();
    constructor(
        private readonly apiService: ApiService,
        private readonly snackBarService: SnackBarService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ManageUserComponent>,
    ) {}

    // tslint:disable-next-line:member-access
    ngOnInit(): void {
        this.user = { ...this.iuser };
        this.buildForm();
        if (this.dbops === DBOperation.create) {
            this.userForm.reset();
            this.hidePasswordInput = false;
        } else {
            this.userForm.setValue(this.user);
        }
        if (this.dbops === DBOperation.delete) {
            this.SetControlsState(this.dbops === DBOperation.delete ? false : true);
            this.enableButton = false;
        }
    }

    private buildForm() {
        this.userForm = this.formBuilder.group({
            _id: [''],
            email: ['', [Validators.required, Validators.email]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            organizationId: [localStorage.getItem('organizationId')],
            role: ['USER', [Validators.required]],
            status: [false],
            username: ['', [Validators.required, Validators.minLength(3)]],
        });
    }
    get f() {
        return this.userForm.controls;
    }

    public submit(form: FormGroup) {
        switch (this.dbops) {
            case DBOperation.create:
                if (form.valid) {
                    if (this.userForm.get('status')?.value === null) {
                        this.userForm.get('status')?.setValue(false);
                    }
                    this.createUser(form).subscribe(
                        (result) => {
                            if (result.data.createUser.action === 'success') {
                                this.iResponse.action = 'success';
                                this.closeMessage(this.iResponse);
                            } else if (result.data.createUser.action === 'exist') {
                                this.msg = 'User already exist you must create a different one.';
                            } else if (result.data.createUser.action === 'error') {
                                this.snackBarService.openSnackBar(result.data.createUser.message, 'OK', 'Error');
                            }
                        },
                        (error) => {
                            this.iResponse.action = 'syserror';
                            this.iResponse.errorMsg = error.message;
                            this.closeMessage(this.iResponse);
                        },
                    );
                }
                break;
            case DBOperation.update:
                if (form.valid) {
                    this.updateUser(form).subscribe(
                        (result) => {
                            if (result.data.updateUser.action === 'success') {
                                // Success
                                this.iResponse.action = 'success';
                                this.closeMessage(this.iResponse);
                            } else if (result.data.updateUser.action === 'error') {
                                this.snackBarService.openSnackBar(result.data.updateUser.message, 'OK', 'Error');
                            }
                        },
                        (error) => {
                            this.iResponse.action = 'syserror';
                            this.iResponse.errorMsg = error.message;
                            this.closeMessage(this.iResponse);
                        },
                    );
                }
                break;
            case DBOperation.delete:
                this.deleteUser(form).subscribe(
                    (result) => {
                        if (result.data.deleteUser.action === 'success') {
                            // Success
                            this.iResponse.action = 'success';
                            this.closeMessage(this.iResponse);
                        } else {
                            this.iResponse.action = 'error';
                            this.closeMessage(this.iResponse);
                        }
                    },
                    (error) => {
                        this.iResponse.action = 'syserror';
                        this.iResponse.errorMsg = error.message;
                        this.closeMessage(this.iResponse);
                    },
                );
                break;
        }
    }

    private createUser(f: FormGroup) {
        return this.apiService.create<IUser>(statement.CREATE, f.value).pipe(takeUntil(this.destroy$));
    }

    public deleteUser(f: FormGroup) {
        return this.apiService.delete(statement.DELETE, f.value).pipe(takeUntil(this.destroy$));
    }

    public updateUser(f: FormGroup) {
        return this.apiService.update<IUser>(statement.UPDATE, f.value).pipe(takeUntil(this.destroy$));
    }

    private closeMessage(response: IResponse) {
        this.dialogRef.close(response);
    }

    public cancel() {
        this.iResponse.action = 'cancel';
        this.closeMessage(this.iResponse);
    }

    private SetControlsState(isEnable: boolean) {
        isEnable ? this.userForm.enable() : this.userForm.disable();
    }
    // tslint:disable-next-line:member-access
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
