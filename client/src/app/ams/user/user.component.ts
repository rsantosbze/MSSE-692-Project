import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DBOperation } from 'src/app/interfaces/DBOperations';
import { IUser } from '../../interfaces';
import { ApiService } from '../../services/api.service';
import { SnackBarService} from '../../services/snack-bar.service';
import { IResponse } from './../../interfaces/interfaces';
import * as statements from './grapql-statements';
import { ManageUserComponent } from './manage/manage.user.component';

@Component({
    selector: 'app-user',
    styleUrls: ['./user.component.css'],
    templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {
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
        'firstName',
        'lastName',
        'username',
        'email',
        'status',
        'role',
        'actions',
    ];
    public dataSource: IUser[] = [];
    public user: IUser = { _id: '', firstName: '' };
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
        const dialogRef = this.dialog.open(ManageUserComponent, {
            disableClose: true,
            height: 'auto',
            width: '600px',
        });
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.iuser = this.user;
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

    public loadData() {
      this.apiService.getAll<any>(statements.FINDALL)
        .pipe(takeUntil(this.destroy$))
        .subscribe(({ data, loading }) => {
          this.dataSource = data.findAllUsers;

          this.dataSource.length === 0 ? (this.displayTable = false) : (this.displayTable = true);
        });
    }

    public refetch() {
        this.apiService.refetch();
    }

    public selectUser(user: IUser) {
        this.user = user;
        this.dbops = DBOperation.update;
        this.modalBtnTitle = 'Update';
        this.modalTitle = 'Update User';
        this.openDialog();
    }

    public deleteUser(user: IUser) {
        this.user = user;
        this.dbops = DBOperation.delete;
        this.modalBtnTitle = 'Delete';
        this.modalTitle = 'Delete User';
        this.openDialog();
    }
    // tslint:disable-next-line:member-access
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
