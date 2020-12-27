import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AuthResponse {
  emailId: string;
  isAuthenticated: boolean;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {}

  signUp(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('http://localhost:8080/user/addUser', {
        emailId: email,
        password,
      })
      .pipe(
        tap((response) => {
          this.resolveUser(response);
        })
      );
  }

  autoLogin(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.emailId,
                                userData.emailId,
                                userData._token,
                                new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() -
                                  new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number): void {

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  login(emailId: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('http://localhost:8080/authenticate', {
        emailId,
        password,
      })
      .pipe(
        tap((response) => {
          this.resolveUser(response);
        })
      );
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  private resolveUser(response: AuthResponse): void {
    const user = new User(
      response.emailId,
      response.emailId,
      response.accessToken,
      new Date(new Date().getTime() + (3600 * 1000))
    );
    this.autoLogout(3600 * 1000);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
