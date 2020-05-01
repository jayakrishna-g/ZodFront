import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  
  constructor(private http: HttpClient) { }
  getdata() {
    return this.http.get('https://bz-iccc.herokuapp.com/api/ratings/all');
  }
}
