// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Rxjs
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Project
import { AuthData } from './auth-data.model';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Create User / Signup
  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
   return this.http.post("http://localhost:3000/api/user/signup", authData)
      .pipe(
        map((data: any) => { return data; }),
         catchError(error => {
           return error;
         })
      )
  }

  // Login User
  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http.post("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        console.log(response);
      });
  }
}
