import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jwt } from './jwt.model';
import { User } from './user.model';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
// Auth service inspired by Poul's slides from 9th lecture
export class AuthService {
  private _isLoggedInOrOut$: BehaviorSubject<boolean>;
  private _currentUserId$: BehaviorSubject<string|null>;
  private _userRole$: BehaviorSubject<"admin"|"user"|null>;

  constructor(private _httpClient: HttpClient) {
    this._isLoggedInOrOut$ = new BehaviorSubject(AuthService.isLoggedIn());
    this._currentUserId$ = new BehaviorSubject(this.obtainCurrentUserId());
    this._userRole$ = new BehaviorSubject(this.obtainCurrentUserRole())
  }

  public get onLoggedInOut$(): Observable<boolean> {
    return this._isLoggedInOrOut$.asObservable();
  }

  public get onCurrentUserId$(): Observable<string|null> {
    return this._currentUserId$.asObservable();
  }
  public get currentUserId(): string|null{
    return this._currentUserId$.value;
  }

  public get isAuth(): boolean{
    return this._isLoggedInOrOut$.value;
  }
  
  public get userRole$(): Observable<"admin"|"user"|null>{
    return this._userRole$.asObservable();
  }
  public register(user: User): Observable<User> {
    return this._httpClient.post<User>(
      `${environment.appUrl}auth/register`,
      user
    );
  }

  public login(user: User): Observable<Jwt> {
    return this._httpClient
      .post<Jwt>(`${environment.appUrl}auth/login`, user)
      .pipe(
        tap((data) => {
          AuthService.saveToken(data.token);
          this._isLoggedInOrOut$.next(true);
          this._currentUserId$.next(this.obtainCurrentUserId());
          this._userRole$.next(this.obtainCurrentUserRole());
        })
      );
  }

  public logout(): void {
    AuthService.deleteToken();
    this._isLoggedInOrOut$.next(false);
    this._currentUserId$.next("");
  }

  public get authToken(): string {
    return AuthService.getToken();
  }

  private static isLoggedIn(): boolean {
    const token = AuthService.getToken();
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private obtainCurrentUserId(): string|null {
    if (this._isLoggedInOrOut$.value) {
      const token = AuthService.getToken();
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload._id;
    } else {
      return null;
    }
  }

  private obtainCurrentUserRole(): "admin"|"user"|null{
    if(!this._isLoggedInOrOut$.value) return null;

    const token = AuthService.getToken();
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    return payload.role;
  }

  public userRole(): "admin"|"user"|null{
    return this._userRole$.value;
  }

  

  private static saveToken(token: string): void {
    window.localStorage['jwt'] = token;
  }

  private static getToken(): string {
    if (window.localStorage['jwt']) {
      return window.localStorage['jwt'];
    } else {
      return '';
    }
  }

  private static deleteToken(): void {
    window.localStorage.setItem('jwt', '');
  }
}
