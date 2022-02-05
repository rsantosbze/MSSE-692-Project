
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DBOperation } from 'src/app/interfaces/DBOperations';
import { IOrganization, IResponse, IUser} from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import * as statement from '../grapql-statements';

@Component({
    selector: 'app-manage.organization',
    styleUrls: ['./manage.organization.component.css'],
    templateUrl: './manage.organization.component.html',
})
export class ManageOrganizationComponent implements OnInit, OnDestroy {
    public dbops!: DBOperation;
    public modalTitle!: string;
    public modalBtnTitle!: string;
    public iorganization!: IOrganization;
    public organization!: IOrganization;
    private msg!: string;
    public orgTypes = ['FACILITY', 'SUPPLIER', 'CONTRACTOR'];
    public addressTypes = ['HOME', 'MAIL', 'BUSINESS'];
    public inputForm: FormGroup;
    public enableButton = true;
    public hidePasswordInput = true;
    private iResponse: IResponse = { action: '', errorMsg: '' };
    private destroy$ = new Subject<void>();
    constructor(
        private readonly apiService: ApiService,
        private readonly snackBarService: SnackBarService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ManageOrganizationComponent>,
    ) {}

    // tslint:disable-next-line:member-access
    ngOnInit(): void {
        this.organization = { ...this.iorganization };
        this.buildForm();
        if (this.dbops === DBOperation.create) {
            this.inputForm.reset();
            this.hidePasswordInput = false;
        } else {
            this.inputForm.setValue(this.organization);
        }
        if (this.dbops === DBOperation.delete) {
            this.SetControlsState(this.dbops === DBOperation.delete ? false : true);
            this.enableButton = false;
        }
    }

    private buildForm() {
        this.inputForm = this.formBuilder.group({
            _id: [''],
            // address: this.formBuilder.group({
            //     _id: [''],
            //     addressType: ['', [Validators.required]],
            //     city: ['', [Validators.required]],
            //     country: ['', [Validators.required]],
            //     state: ['', [Validators.required]],
            //     streetLine1: ['', [Validators.required]],
            //     streetLine2: [''],
            //     zipCode: [
            //         ,
            //         [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5), Validators.maxLength(5)],
            //     ],
            // }),
            organizationName: ['', [Validators.required]],
            organizationType: ['', [Validators.required]],
        });
    }
    get f() {
        return this.inputForm.controls;
    }

    public submit(form: FormGroup) {
        switch (this.dbops) {
            case DBOperation.create:
                if (form.valid) {
                    this.create(form).subscribe(
                        (result) => {
                            if (result.data.createOrg.action === 'success') {
                                this.iResponse.action = 'success';
                                this.closeMessage(this.iResponse);
                            } else if (result.data.createOrg.action === 'exist') {
                                this.msg = 'User already exist you must create a different one.';
                            } else if (result.data.createOrg.action === 'error') {
                                this.snackBarService.openSnackBar(result.data.createOrg.message, 'OK', 'Error');
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
                    this.update(form).subscribe(
                        (result) => {
                            if (result.data.updateOrg.action === 'success') {
                                // Success
                                this.iResponse.action = 'success';
                                this.closeMessage(this.iResponse);
                            } else if (result.data.updateOrg.action === 'error') {
                                this.snackBarService.openSnackBar(result.data.updateOrg.message, 'OK', 'Error');
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
                this.delete(form).subscribe(
                    (result) => {
                        if (result.data.deleteOrg.action === 'success') {
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

  private create(f: FormGroup) {
    console.log(f.get('address.zipCode')?.value);
    f.patchValue({
        address: { zipCode: 1 * f.get('address.zipCode')?.value },
    });
    return this.apiService.create<IUser>(statement.CREATE, f.value).pipe(takeUntil(this.destroy$));
    }

    public delete(f: FormGroup) {
        return this.apiService
            .delete(statement.DELETE, f.value)
            .pipe(takeUntil(this.destroy$));
    }

  public update(f: FormGroup) {
     f.patchValue({
         address: { zipCode: 1 * f.get('address.zipCode')?.value },
     });
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
        isEnable ? this.inputForm.enable() : this.inputForm.disable();
    }

    // tslint:disable-next-line:member-access
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
