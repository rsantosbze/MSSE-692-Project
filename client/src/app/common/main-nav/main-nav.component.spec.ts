import { LayoutModule } from '@angular/cdk/layout';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/auth/service/auth.services';

import * as mainNavComponent from './main-nav.component';

describe('MainNavComponent', () => {
  let component: mainNavComponent.MainNavComponent;
  let fixture: ComponentFixture<mainNavComponent.MainNavComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [mainNavComponent.MainNavComponent],
        imports: [
            RouterTestingModule,
            NoopAnimationsModule,
            LayoutModule,
            MatButtonModule,
            MatIconModule,
            MatListModule,
            MatSidenavModule,
            MatToolbarModule,
            MatMenuModule,
        ],
        providers: [AuthService],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(mainNavComponent.MainNavComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
