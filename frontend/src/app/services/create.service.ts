import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  create(body:any){
    return this.http.post(`${this.baseUrl}/create`, body, {responseType: 'json'});
  }

}
