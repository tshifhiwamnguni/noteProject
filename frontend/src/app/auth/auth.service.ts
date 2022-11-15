import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    token: `${localStorage.getItem('token')}`,
  }),
  responseType: 'json' as 'json',
  withCredentials: false,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  register(body: any){
    return this.http.post(`${this.baseUrl}/register`, body, httpOptions);
  }

  login(body: any){
    return this.http.post(`${this.baseUrl}/login`, body, httpOptions);
  } 
  //Gaurds
  token = localStorage.getItem('token');
  isLoggIn = false;

  isLoggedIn(){
    return localStorage.getItem('token') != null;
  }
  
  
}
