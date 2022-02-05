import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DBOperation } from 'src/app/interfaces/DBOperations';
import { IAsset, IOrganization, IResponse, IUser } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import * as statement from '../grapql-statements';
import { IMaintenanceRecord } from './../../../interfaces/interfaces';

@Component({
    selector: 'app-manage.maintenance-record.',
    styleUrls: ['./manage.maintenance-record.component.css'],
    templateUrl: './manage.maintenance-record.component.html',
})
export class ManageMaintenanceRecordComponent implements OnInit, OnDestroy {
    public dbops!: DBOperation;
    public modalTitle!: string;
    public modalBtnTitle!: string;
    public imaintenanceRecord!: IMaintenanceRecord;
    public maintenanceRecord!: IMaintenanceRecord;
    public assets: IAsset[];
    private msg!: string;
    public userId: string;
    public assetId: string;

    public facilities: IOrganization[] = [];
    public inputForm: FormGroup;
    public enableButton = true;
    public disableInput = false;
    private iResponse: IResponse = { action: '', errorMsg: '' };
    private destroy$ = new Subject<void>();
    constructor(
        private readonly apiService: ApiService,
        private readonly snackBarService: SnackBarService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ManageMaintenanceRecordComponent>,
    ) {}

    // tslint:disable-next-line:member-access
    ngOnInit(): void {
        this.maintenanceRecord = { ...this.imaintenanceRecord };
        this.buildForm();
        if (this.dbops === DBOperation.create) {
            this.inputForm.reset();
            this.inputForm.patchValue({
                 assetId: this.assetId ,
            });
            this.inputForm.patchValue({
              userId: this.userId,
            });
            this.inputForm.get('assetId')?.disable();
           // this.disableInput = true;
        } else {
            this.inputForm.setValue(this.maintenanceRecord);
        }
        if (this.dbops === DBOperation.delete) {
            this.SetControlsState(this.dbops === DBOperation.delete ? false : true);
            this.enableButton = false;
        }
    }

    private buildForm() {
        this.inputForm = this.formBuilder.group({
            _id: [''],
            // asset: this.formBuilder.group({
            //     _id: ['', [Validators.required]],
            // }),
            assetId: ['', [Validators.required]],
            dateOfMaintenance: ['', [Validators.required]],
            maintenanceDescription: ['', [Validators.required]],
            userId: ['', [Validators.required]],
            // user: this.formBuilder.group({
            //     _id: [''],
            // }),
        });
    }
    get f() {
        return this.inputForm.controls;
    }

    public submit(form: FormGroup) {
        this.inputForm.get('assetId')?.enable();
        switch (this.dbops) {
            case DBOperation.create:
                if (form.valid) {
                    this.create(form).subscribe(
                        (result) => {
                            if (result.data.createMaintenanceRecord.action === 'success') {
                                this.iResponse.action = 'success';
                                this.closeMessage(this.iResponse);
                            } else if (result.data.createMaintenanceRecord.action === 'exist') {
                                this.msg = 'User already exist you must create a different one.';
                            } else if (result.data.createMaintenanceRecord.action === 'error') {
                                this.snackBarService.openSnackBar(result.data.createMaintenanceRecord.message, 'OK', 'Error');
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
                            if (result.data.updateMaintenanceRecord.action === 'success') {
                                // Success
                                this.iResponse.action = 'success';
                                this.closeMessage(this.iResponse);
                            } else if (result.data.updateMaintenanceRecord.action === 'error') {
                                this.snackBarService.openSnackBar(result.data.updateMaintenanceRecord.message, 'OK', 'Error');
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
                        if (result.data.deleteMaintenanceRecord.action === 'success') {
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
