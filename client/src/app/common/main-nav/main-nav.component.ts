import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../auth/service/auth.services';

@Component({
    selector: 'app-main-nav',
    styleUrls: ['./main-nav.component.css'],
    templateUrl: './main-nav.component.html',
})
export class MainNavComponent implements OnInit, OnDestroy {
    public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map((result) => result.matches),
        shareReplay(),
    );
    public showLinks = false;
    private destroy$ = new Subject<void>();
    constructor(
        private breakpointObserver: BreakpointObserver,
        private readonly authService: AuthService,
        private router: Router,
    ) {}
    // tslint:disable-next-line:member-access
    ngOnInit(): void {
        const currentUserStatus = this.authService.currentUserStatus;
        currentUserStatus.pipe(takeUntil(this.destroy$)).subscribe((status) => {
          if (JSON.stringify(status) !== '{}') {
              this.showLinks = true;
          } else {
              this.showLinks = false;
          }
        });
    }

    public logout() {
      this.authService.logout();
      this.router.navigate(['/']);
    }
    // tslint:disable-next-line:member-access
    ngOnDestroy() {
        this.authService.logout();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
