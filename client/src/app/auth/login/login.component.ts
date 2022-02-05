import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar.service';
import * as statement from '../grapql-statements';
import { AuthService } from '../service/auth.services';

export interface ILogin {
    username: string;
    password: string;
}
@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public modalTitle = 'Login';
    private returnUrl!: string;
    private error: string;

    constructor(
        private readonly authService: AuthService,
        private readonly snackBarService: SnackBarService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    // tslint:disable-next-line:member-access
    ngOnInit(): void {
        this.buildForm();

        // reset login status
        this.authService.logout();

        // get return url from route parameters or default to '/'

        this.route.queryParams.subscribe((params) => this.returnUrl = params.returnUrl);
        this.returnUrl = this.returnUrl || '/users';
    }

    private buildForm() {
        this.loginForm = this.formBuilder.group({
            password: ['', [Validators.required]],
            username: ['', [Validators.required]],
        });
    }

    get f() {
        return this.loginForm.controls;
    }
    public submit(form: FormGroup) {
        if (form.valid) {
            this.loginUser(form).subscribe(
                (value) => {
                this.error = '';
                this.router.navigate([this.returnUrl]);
                },
              (error) => {
                this.snackBarService.openSnackBar(error.message, 'OK', 'Error');
                },
            );
        }
    }

    private loginUser(f: FormGroup) {
        return this.authService.loginGQL<ILogin>(statement.LOGIN, f.value);
    }
  public cancel() {
       this.router.navigate(['/']);
    }
}
