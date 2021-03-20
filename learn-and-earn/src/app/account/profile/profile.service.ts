// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService{

  constructor(private http: HttpClient) { }

  // Get a user profile
  getUserProfile(userEmail: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("email", userEmail);
    return this.http.get("http://localhost:3000/api/userDetails", {params: params});
  }
}
