import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import * as statements from './grapql-statements';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    constructor(private readonly apiService: ApiService) {}

    // tslint:disable-next-line:member-access
  ngOnInit() {
    this.loadData();
  }

    public loadData() {
        this.apiService
            .getAll<any>(statements.FINDMAINCOMPANY)
            .subscribe(({ data, loading }) => {
             // console.log(data.findMainCompany[0]._id);
              localStorage.setItem('organizationId', data.findMainCompany[0]._id);
            });
    }
}
