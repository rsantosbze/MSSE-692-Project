import { IMaintenanceRecord } from './../../interfaces/interfaces';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/service/auth.services';
import { DBOperation } from 'src/app/interfaces/DBOperations';
import { IAsset, IOrganization, IResponse } from '../../interfaces/interfaces';
import { ApiService } from '../../services/api.service';
import { SnackBarService } from '../../services/snack-bar.service';
import * as statements from './grapql-statements';
import { ManageMaintenanceRecordComponent } from './manage/manage.maintenance-record.component';

@Component({
    selector: 'app-asset',
    styleUrls: ['./maintenance-record.component.css'],
    templateUrl: './maintenance-record.component.html',
})
export class MaintenanceRecordComponent implements OnInit, OnDestroy {
    public heading = '';
    public displayform = false;
    private msg = '';
    private action = 'OK';
    private dbops!: DBOperation;
    private modalTitle!: string;
    private modalBtnTitle!: string;
    public displayTable = false;
    private destroy$ = new Subject<void>();
    public hideAssetSelection = true;
    public hideNewButton = true;

    public displayedColumns: string[] = [
        // 'id',
        'maintenanceDescription',
        'dateOfMaintenance',
        'actions',
    ];
    public dataSource: IAsset[] = [];
    public facilities: IOrganization[] = [];
    private organizations: IOrganization[] = [];
    private suppliers: IOrganization[] = [];
    public assets: IAsset[] = [];
    public maintenanceRecord: IMaintenanceRecord = { _id: '' };
    private userId: string;
    public assetId: string;
    constructor(
        private readonly apiService: ApiService,
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private readonly snackService: SnackBarService,
        private readonly authService: AuthService,
    ) {}

    // tslint:disable-next-line:member-access
    ngOnInit() {
        this.loadFacilities();
        if (this.authService.currentUserValue.accessToken) {
            const { userId } = this.authService.getDecodedAccessToken(this.authService.currentUserValue.accessToken);
            this.userId = userId;
        }
    }

    private openDialog() {
        const dialogRef = this.dialog.open(ManageMaintenanceRecordComponent, {
            disableClose: true,
            height: 'auto',
            width: '600px',
        });
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.imaintenanceRecord = this.maintenanceRecord;
        dialogRef.componentInstance.assets = [...this.assets];
        dialogRef.componentInstance.userId = this.userId;
        dialogRef.componentInstance.assetId = this.assetId;
        dialogRef.afterClosed().subscribe((result: IResponse) => {
            if (result.action === 'success' || result.action === 'exist') {
                this.action = 'Success';
                switch (this.dbops) {
                    case DBOperation.create:
                        if (result.action !== 'exist') {
                            this.msg = 'Data successfully added.';
                        } else {
                            this.msg = 'Data already exist.';
                            this.action = 'Error';
                        }
                        break;
                    case DBOperation.update:
                        this.msg = 'Data successfully updated.';
                        break;
                    case DBOperation.delete:
                        this.msg = 'Data successfully deleted.';
                        break;
                }
            } else if (result.action === 'error' && (this.dbops === DBOperation.create || this.dbops === DBOperation.update)) {
                this.msg = 'There is some issue in saving records, please contact your system administrator!';
                this.action = 'Error';
            } else if (result.action === 'error' && this.dbops === DBOperation.delete) {
                this.msg = 'There is some issue in deleting records, please contact your system administrator!';
                this.action = 'Error';
            } else if (result.action === 'syserror') {
                this.msg = result.errorMsg;
                this.snackService.openSnackBar(this.msg, 'OK', 'Error');
                this.dbops = 0;
            }
            if (
                (this.dbops === DBOperation.create || this.dbops === DBOperation.update || this.dbops === DBOperation.delete) &&
                result.action !== 'cancel'
            ) {
                this.refetch();
                this.snackService.openSnackBar(this.msg, 'OK', this.action);
            }
        });
    }
    private loadFacilities() {
        this.apiService
            .getAll<any>(statements.FINDFACILITIES)
            .pipe(takeUntil(this.destroy$))
            .subscribe(({ data, loading }) => {
                this.organizations = data.findAllFacilities;
                this.facilities = this.organizations.filter((org) => org.organizationType === 'FACILITY');
                this.suppliers = this.organizations.filter((org) => org.organizationType === 'SUPPLIER');
            });
    }

    public refetch() {
        this.apiService.refetch();
    }

    public select(maintenanceRecord: IMaintenanceRecord) {
        this.maintenanceRecord = maintenanceRecord;
        this.dbops = DBOperation.update;
        this.modalBtnTitle = 'Update';
        this.modalTitle = 'Update Maintenance Record';
        this.openDialog();
    }

    public new() {
        this.maintenanceRecord = { _id: '' };
        this.dbops = DBOperation.create;
        this.modalBtnTitle = 'Add';
        this.modalTitle = 'Add a New Maintenance Record';
        this.openDialog();
    }

    public delete(maintenanceRecord: IMaintenanceRecord) {
        this.maintenanceRecord = maintenanceRecord;
        this.dbops = DBOperation.delete;
        this.modalBtnTitle = 'Delete';
        this.modalTitle = 'Delete Maintenance Record';
        this.openDialog();
    }

    public getAssets(e: string) {
      if (e !== undefined) {
        this.dataSource = [];
        this.displayTable = false;
        this.hideNewButton = true;
        this.apiService
                .getAllById<any>(statements.FINDASSETBYFACILITY, e)
                .pipe(takeUntil(this.destroy$))
                .subscribe(({ data, loading }) => {
                    this.assets = data.findOrg.fassets;
                });
        if (this.assets) {
                this.hideAssetSelection = false;
            }
        } else {
            this.hideAssetSelection = true;
            this.displayTable = false;
        }
    }
    public getRecords(e: string) {
        if (e !== undefined) {
            this.assetId = e;
            this.hideNewButton = false;
            this.apiService
                .getAllById<any>(statements.FINDASSET, e)
                .pipe(takeUntil(this.destroy$))
              .subscribe(({ data, loading }) => {
                    this.dataSource = data.findAsset.maintenanceRecords;
                    this.dataSource.length === 0 ? (this.displayTable = false) : (this.displayTable = true);
                });
        } else {
            this.displayTable = false;
            this.dataSource = [];
            this.assetId = '';
            this.hideNewButton = true;
        }
    }
    // tslint:disable-next-line:member-access
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
