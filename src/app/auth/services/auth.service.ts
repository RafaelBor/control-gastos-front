import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../enums/auth-status.enum';
import { LoginResponse } from '../interfaces/login-response.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { checkTokenResponse } from '../interfaces/check-token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private readonly http = inject(HttpClient)

  private readonly _currentUser = signal< User | null >(null)
  private readonly _authStatus = signal<AuthStatus>(AuthStatus.cheking)

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus())
  constructor() { 
    this.checkAuthStatus().subscribe()
  }


  login(email: string, password: string): Observable<boolean>{
    const url = `${this.baseUrl}/auth/login`;
    const body = {email, password};

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({data}) => this.setAuthentication(data.userData, data.token)),
        catchError(err => {
          return throwError(() => err.error)

        })
      ) 
  }

  register(request: any){
    const url = `${this.baseUrl}/auth/register`;

    return this.http.post<LoginResponse>(url, request)
      .pipe(
        map(({data}) => data),
        catchError(err => {
          return throwError(() => err.error.message)

        })
      ) 
  }

  sendVerification(request: {email: string}){
     const url = `${this.baseUrl}/auth/send-verification`;

    return this.http.post<LoginResponse>(url, request)
      .pipe(
        map(({data}) => data),
        catchError(err => {
          return throwError(() => err.error.message)
        })
      ) 
  }

   verifyCode(request: {email: string, code: string}){
     const url = `${this.baseUrl}/auth/verify-email`;

    return this.http.post<LoginResponse>(url, request)
      .pipe(
        map(({data}) => data),
        catchError(err => {
          return throwError(() => err.error.message)
        })
      ) 
  }

  checkAuthStatus(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token')

    if(!token) {
      this.logout();
      return of(false)
    }

    return this.http.get<any>(url)
      .pipe(
        map(({data}) => this.setAuthentication(data.userData, data.token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated)
          return of(false)

        })
      ) 
  }

  private setAuthentication(user: User, token: string):boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);

    localStorage.setItem('token', token);

    if(user && user !== undefined)
    localStorage.setItem('user', JSON.stringify(user))

    return true;
  }

  get currentUserStorage(): User | null {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) as User : null;
  }

  changePassword(request: {curretPassword: string, newPassword: string}){
    const url = `${this.baseUrl}/auth/change-password`;

    return this.http.patch(url, request)
    .pipe(
      catchError(err => {
        return throwError(() => err.error.message)
      })
    ) 
  }

  requestEmailForgot(request: {email: string}){
    const url = `${this.baseUrl}/auth/request-password-reset`;

    return this.http.post(url, request)
    .pipe(
      catchError(err => {
        return throwError(() => err.error.message)
      })
    ) 
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 

    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}


