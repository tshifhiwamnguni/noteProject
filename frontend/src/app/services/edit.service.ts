import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  edit(data: any){
    return this.http.put(`${this.baseUrl}/update`, data, {responseType: 'json'});
  }

  updatePassword(id: any, body: any){
    return this.http.put(`${this.baseUrl}/updatePass/${id}`,body, {responseType: 'json'})
  }
}
