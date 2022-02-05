
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DBOperation } from 'src/app/interfaces/DBOperations';
import { IUser } from '../../interfaces';
import { IAsset, IOrganization, IResponse } from '../../interfaces/interfaces';
import { ApiService } from '../../services/api.service';
import { SnackBarService} from '../../services/snack-bar.service';
import * as statements from './grapql-statements';
import { ManageAssetComponent } from './manage/manage.asset.component';

@Component({
    selector: 'app-asset',
    styleUrls: ['./asset.component.css'],
    templateUrl: './asset.component.html',
})
export class AssetComponent implements OnInit, OnDestroy {
    public heading = '';
    public displayform = false;
    private msg = '';
    private action = 'OK';
    private dbops!: DBOperation;
    private modalTitle!: string;
    private modalBtnTitle!: string;
    public displayTable = false;
    private destroy$ = new Subject<void>();

    public displayedColumns: string[] = [
       // 'id',
        'assetName',
        'assetCode',
        'assetDescription',
        'dateOfManufacture',
        'dateOfInstallation',
        'actions',
    ];
    public dataSource: IAsset[] = [];
    public facilities: IOrganization[] = [];
    private organizations: IOrganization[] = [];
    private suppliers: IOrganization[] = [];
    public assets: IAsset[] = [];
    public asset: IAsset = { _id: '' };
    public hideAddButton = true;
    private facilityId: string;
    constructor(
        private readonly apiService: ApiService,
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private readonly snackService: SnackBarService,
    ) {}

    // tslint:disable-next-line:member-access
    ngOnInit() {
        this.loadFacilities();

    }

    private openDialog() {
        const dialogRef = this.dialog.open(ManageAssetComponent, {
            disableClose: true,
            height: 'auto',
            width: '600px',
        });
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.facilities = this.facilities;
        dialogRef.componentInstance.suppliers = this.suppliers;
        dialogRef.componentInstance.iasset = this.asset;
        dialogRef.componentInstance.facilityId = this.facilityId;
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

    public select(asset: IAsset) {
      this.asset = asset;
      console.log(this.asset);
        this.dbops = DBOperation.update;
        this.modalBtnTitle = 'Update';
        this.modalTitle = 'Update Asset';
        this.openDialog();
    }

    public new() {
        this.asset = { _id: '' };
        this.dbops = DBOperation.create;
        this.modalBtnTitle = 'Add';
        this.modalTitle = 'Add a New Asset';
        this.openDialog();
    }

    public delete(asset: IAsset) {
        this.asset = asset;
        this.dbops = DBOperation.delete;
        this.modalBtnTitle = 'Delete';
        this.modalTitle = 'Delete Asset';
        this.openDialog();
    }

    public getAssets(e: string) {
      if (e !== undefined) {
        this.facilityId = e;
        this.hideAddButton = false;
        this.apiService
                .getAllById<any>(statements.FINDASSETBYFACILITY, e)
                .pipe(takeUntil(this.destroy$))
                .subscribe(({ data, loading }) => {
                    this.dataSource = data.findOrg.fassets;
                    this.dataSource === undefined ? (this.displayTable = false) : (this.displayTable = true);
                });
      } else {
        this.hideAddButton = true;
        this.displayTable = false;
        this.dataSource = [];
        this.facilityId = '';
        }
    }
    // tslint:disable-next-line:member-access
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
