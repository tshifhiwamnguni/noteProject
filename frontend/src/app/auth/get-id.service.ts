import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const token = localStorage.getItem('token');

const httpOptions = {
  Headers: new HttpHeaders({'Content-Type': 'application/json','token': `${token}`}),
  responseType: 'json' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class GetIdService {

  baseurl = environment.baseUrl;

  constructor(private view: HttpClient, private authService: AuthService) { }

  getID(){
    return this.view.get(`${this.baseurl}/getid`, httpOptions);
  }
}
