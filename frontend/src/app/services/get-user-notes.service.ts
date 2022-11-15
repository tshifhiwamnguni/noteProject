import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetUserNotesService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUserNotes(id: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/get/${id}`, {responseType: 'json'});
  }
}
