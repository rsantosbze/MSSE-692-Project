import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.services';
import { SnackBarService } from '../../../services/snack-bar.service';
import * as statement from './grapql-statements';

export interface IRegister {
    username: string;
    password: string;
    email: string;
    organizationId: string;
}

@Component({
    selector: 'app-register',
    styleUrls: ['./register.component.css'],
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    public modalTitle = 'Register User';
    private returnUrl = '/home';
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
    }

    private buildForm() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required]],
            organizationId: [localStorage.getItem('organizationId')],
            password: ['', [Validators.required]],
            username: ['', [Validators.required]],
        });
    }
    get f() {
        return this.registerForm.controls;
    }
    public submit(form: FormGroup) {
        if (form.valid) {
            this.registerUser(form).subscribe(
                (result) => {
                    if (result.data.registerUser.action === 'success') {
                        this.snackBarService.openSnackBar('Successful Registration', 'OK', 'Success');
                        this.router.navigate([this.returnUrl]);
                    } else if (result.data.registerUser.action === 'error') {
                        this.snackBarService.openSnackBar(result.data.registerUser.message, 'OK', 'Error');
                    }
                },
                (error) => {},
            );
        }
    }

    private registerUser(f: FormGroup) {
        return this.authService.registerGQL<IRegister>(statement.REGISTER, f.value);
    }
    public cancel() {
        this.router.navigate(['/']);
    }
}
