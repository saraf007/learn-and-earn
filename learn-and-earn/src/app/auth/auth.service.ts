// Angular
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Rxjs
import { Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Project
import { AuthData } from './auth-data.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  // Create User / Signup
  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
   return this.http.post<{message: string}>("http://localhost:3000/api/user/signup", authData);
  }

  // Login User
  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    return this.http.post<{token: string, message: string, expiresIn: number}>("http://localhost:3000/api/user/login", authData)
      .pipe(
        map((data: any) => {
            const token = data.token;
            this.token = token;
            if(this.token) {
              const expiresInDuration = data.expiresIn;
              this.setAuthTimer(expiresInDuration);
              this.isAuthenticated = true;
              this.authStatusListener.next(true);
              const now = new Date();
              const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
              console.log(expirationDate);
              this.saveAuthData(token, expirationDate);
            }
            return data;
           }),
         catchError(error => {
           return error;
         })
      )
  }

  // Get Token
  getToken() {
    return this.token;
  }

  // gets if the current status is authenticated or not
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // finds whether the user is authenticated or not
  getIsAuth() {
    return this.isAuthenticated;
  }

  // Logout User
  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // get authentication info from local storage
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
      if(!token || !expirationDate) {
        return;
      }
      return {
        token: token,
        expirationDate: new Date(expirationDate)
      }
  }

  // saving authentication data on browser
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  // clearing authentication data saved on browser
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  //automatic authentication of user if info available in local storage of browser
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.token = authInformation.token;
        this.isAuthenticated = true;
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListener.next(true);
      }
  }

  private setAuthTimer(duration: number) {
    console.log("setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }
 }

