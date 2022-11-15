import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  delete(id: any, user_id: any){
    return this.http.delete(`${this.baseUrl}/delete/${id}/${user_id}`, {responseType: 'json'});
  }

  success = '';
}
