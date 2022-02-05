import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
@Component({
  selector: 'app-snack-bar',
  styleUrls: ['./snack-bar.component.css'],
  templateUrl: './snack-bar.component.html',
})
export class SnackBarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  // tslint:disable-next-line:member-access
  ngOnInit(): void {}
  public getIcon() {
    switch (this.data.snackType) {
      case 'Success':
        return 'done';
      case 'Error':
        return 'error';
      case 'Warn':
        return 'warning';
      case 'Info':
        return 'info';
      default: return undefined;
    }
  }
}
