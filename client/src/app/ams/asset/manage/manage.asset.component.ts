import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/service/auth.services';
import { DBOperation } from 'src/app/interfaces/DBOperations';
import { IAsset, IOrganization, IResponse, IUser } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import * as statement from '../grapql-statements';

@Component({
    selector: 'app-manage.asset',
    styleUrls: ['./manage.asset.component.css'],
    templateUrl: './manage.asset.component.html',
})
export class ManageAssetComponent implements OnInit, OnDestroy {
    public dbops!: DBOperation;
    public modalTitle!: string;
    public modalBtnTitle!: string;
    public iasset!: IAsset;
    public asset!: IAsset;
    private msg!: string;
    public suppliers: IOrganization[] = [];
    public facilities: IOrganization[] = [];
    public inputForm: FormGroup;
    public enableButton = true;
    private iResponse: IResponse = { action: '', errorMsg: '' };
    private destroy$ = new Subject<void>();
    public facilityId: string;
    public disableInput = false;
    constructor(
        private readonly apiService: ApiService,
        private readonly snackBarService: SnackBarService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ManageAssetComponent>,
        private authService: AuthService,
    ) {}

    // tslint:disable-next-line:member-access
    ngOnInit(): void {
        this.asset = { ...this.iasset };
        this.buildForm();
        if (this.dbops === DBOperation.create) {
            this.inputForm.reset();
            this.inputForm.patchValue({
                facilityId: this.facilityId,
            });
            this.inputForm.patchValue({
                userId: localStorage.getItem('user'),
            });
            this.inputForm.get('facilityId')?.disable();
            // this.disableInput = true;
        } else {
            this.inputForm.setValue(this.asset);
        }
        if (this.dbops === DBOperation.delete) {
            this.SetControlsState(this.dbops === DBOperation.delete ? false : true);
            this.enableButton = false;
        }
    }

    private buildForm() {
        this.inputForm = this.formBuilder.group({
            _id: [''],
            assetCode: ['', [Validators.required]],
            assetDescription: ['', [Validators.required]],
            assetName: ['', [Validators.required]],
            dateOfInstallation: ['', [Validators.required]],
            dateOfManufacture: ['', [Validators.required]],
            facilityId: ['', [Validators.required]],
            supplierId: ['', [Validators.required]],
            userId: [''],
            // facility: this.formBuilder.group({
            //     _id: ['', [Validators.required]],
            // }),
            // supplier: this.formBuilder.group({
            //     _id: ['', [Validators.required]],
            // }),
        });
    }
    get f() {
        return this.inputForm.controls;
    }

    public submit(form: FormGroup) {
        this.inputForm.get('facilityId')?.enable();
        switch (this.dbops) {
            case DBOperation.create:
                if (form.valid) {
                    this.create(form).subscribe(
                        (result) => {
                            if (result.data.createAsset.action === 'success') {
                                this.iResponse.action = 'success';
                                this.closeMessage(this.iResponse);
                            } else if (result.data.createAsset.action === 'exist') {
                                this.msg = 'Asset already exist you must create a different one.';
                            } else if (result.data.createAsset.action === 'error') {
                                this.snackBarService.openSnackBar(result.data.createAsset.message, 'OK', 'Error');
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
                            if (result.data.updateAsset.action === 'success') {
                                // Success
                                this.iResponse.action = 'success';
                                this.closeMessage(this.iResponse);
                            } else if (result.data.updateAsset.action === 'error') {
                                this.snackBarService.openSnackBar(result.data.updateAsset.message, 'OK', 'Error');
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
                this.inputForm.enable();
                this.delete(form).subscribe(
                    (result) => {
                        if (result.data.deleteAsset.action === 'success') {
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
        return this.apiService.create<IAsset>(statement.CREATE, f.value).pipe(takeUntil(this.destroy$));
    }

    public delete(f: FormGroup) {
        return this.apiService.delete<IAsset>(statement.DELETE, f.value).pipe(takeUntil(this.destroy$));
    }

    public update(f: FormGroup) {
        return this.apiService.update<IAsset>(statement.UPDATE, f.value).pipe(takeUntil(this.destroy$));
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
