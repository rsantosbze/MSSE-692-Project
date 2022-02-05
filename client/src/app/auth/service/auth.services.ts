/**
 * Based on
 * https://github.com/cornflourblue/angular-7-jwt-authentication-example
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface IApplicationUser {
    accessToken?: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<IApplicationUser>;
    public currentUser: Observable<IApplicationUser>;
    private appUser: IApplicationUser = {};


    constructor( private apollo: Apollo) {
        this.currentUserSubject = new BehaviorSubject<IApplicationUser>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): IApplicationUser {
        return this.currentUserSubject.value;
    }

    public get currentUserStatus() {
        return this.currentUserSubject;
    }
    public loginGQL<T>(q: any, input: T) {
        return this.apollo
            .mutate<any>({
                mutation: q,
                variables: {
                    input,
                },
            })
            .pipe(
                map((result) => {
                    const user: IApplicationUser = result.data.login;
                    // login successful if there's a jwt token in the response
                    if (user && user.accessToken) {
                        // store; user; details; and; jwt; token in local
                        // storage; to; keep; user; logged in between; page; refreshes;
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                        localStorage.setItem('user', this.getDecodedAccessToken(user.accessToken).userId);
                    }

                    return user;
                }),
            );
    }

   public  getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    public registerGQL<T>(q: any, input: T) {
        return this.apollo.mutate<any>({
            mutation: q,
            variables: {
                input,
            },
        });
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('user');
        this.currentUserSubject.next(this.appUser);
    }
}
