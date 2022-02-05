import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, waitForAsync } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { IUser } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { MaterialModule } from './../../common/material/material.module';
import * as statements from './grapql-statements';
import { UserComponent } from './user.component';
const mockData: IUser = {
  _id: '60d73edef21f79c06cb1597c',
  email: 'rjsaint@yahoo.com',
  firstName: 'TestUser',
  lastName: 'Santos',
  role: 'ADMIN',
  status: true,
  username: 'admin',
};

describe('UserComponent', () => {
    let controller: ApolloTestingController;
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let el: DebugElement;
    // const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);
    // const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getAll']);

    beforeEach( waitForAsync(() => {
      TestBed.configureTestingModule({
          declarations: [UserComponent],
          imports: [ApolloTestingModule, MaterialModule],
        providers: [
               ApiService,
          ],
      })
          .compileComponents()
          .then(() => {
              fixture = TestBed.createComponent(UserComponent);
              component = fixture.componentInstance;
              el = fixture.debugElement;
              controller = TestBed.inject(ApolloTestingController);

          });

    }));
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should retrieve users using mock GRAPHQL request', fakeAsync(() => {
      fixture.detectChanges();

      const op = controller.expectOne(statements.FINDALL);
      op.flush({
          data: {
              findAllUsers: [
                 mockData,
              ],
          },
      });
      flushMicrotasks();
      expect(component.dataSource).toEqual([mockData]);
    }));

    afterEach(() => {
        controller.verify();
    });
});
