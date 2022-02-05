import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DBOperation } from 'src/app/interfaces/DBOperations';
import { IUser } from '../../interfaces';
import { IOrganization, IResponse } from '../../interfaces/interfaces';
import { ApiService } from '../../services/api.service';
import { SnackBarService} from '../../services/snack-bar.service';
import * as statements from './grapql-statements';
import { ManageOrganizationComponent } from './manage/manage.organization.component';

@Component({
    selector: 'app-organization',
    styleUrls: ['./organization.component.css'],
    templateUrl: './organization.component.html',
})
export class OrganizationComponent implements OnInit, OnDestroy {
    public heading = '';
    public displayform = false;
    private msg = '';
    private action = 'OK';
    private dbops!: DBOperation;
    private modalTitle!: string;
    private modalBtnTitle!: string;
    public displayTable = true;
    private destroy$ = new Subject<void>();

    public displayedColumns: string[] = [
        // 'id',
        'organizationName',
        'organizationType',
        'actions',
    ];
    public dataSource: IOrganization[] = [];
    public organization: IOrganization = { _id: '' };
    constructor(
        private readonly apiService: ApiService,
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private readonly snackService: SnackBarService,
    ) {}

    // tslint:disable-next-line:member-access
    ngOnInit() {
        this.loadData();
    }

    private openDialog() {
        const dialogRef = this.dialog.open(ManageOrganizationComponent, {
            disableClose: true,
            height: 'auto',
            width: '600px',
        });
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.iorganization = this.organization;
        dialogRef.afterClosed().subscribe((result: IResponse) => {
            // console.log(result);
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

    public loadData() {
        this.apiService
            .getAll<any>(statements.FINDALL)
            .pipe(takeUntil(this.destroy$))
            .subscribe(({ data, loading }) => {
                this.dataSource = data.findAllOrgs;
                this.dataSource.length === 0 ? (this.displayTable = false) : (this.displayTable = true);
            });
    }

    public refetch() {
        this.apiService.refetch();
    }

    public selectOrganization(organization: IOrganization) {
        this.organization = organization;
        this.dbops = DBOperation.update;
        this.modalBtnTitle = 'Update';
        this.modalTitle = 'Update Organization';
        this.openDialog();
    }

    public newOrganization() {
        this.organization = { _id: '' };
        this.dbops = DBOperation.create;
        this.modalBtnTitle = 'Add';
        this.modalTitle = 'Add a New Organization';
        this.openDialog();
    }

    public deleteOrganization(organization: IOrganization) {
        this.organization = organization;
        this.dbops = DBOperation.delete;
        this.modalBtnTitle = 'Delete';
        this.modalTitle = 'Delete Organization';
        this.openDialog();
    }

// tslint:disable-next-line:member-access
    ngOnDestroy() {
       this.destroy$.next();
       this.destroy$.complete();
    }
}
