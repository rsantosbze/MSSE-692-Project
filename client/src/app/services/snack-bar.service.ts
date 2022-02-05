import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../common/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}
  public openSnackBar(message: string, action: string, snackType?: string) {
     snackType = snackType !== undefined ? snackType : 'Success';
     this.snackBar.openFromComponent(SnackBarComponent, {
       data: { message, snackType },
       duration: 2000,
       horizontalPosition: 'end',
       panelClass: snackType === 'Error' ? ['red-snackbar'] : ['green-snackbar'],
       verticalPosition: 'top',
     });
  }
}
