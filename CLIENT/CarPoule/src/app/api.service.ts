import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:3000'; // replace with your server URL

  constructor(private http: HttpClient) { }

  getCarpool(departure: string, arrival: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/search/${departure}/${arrival}`);
  }

  getCarpooltest(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/search`);
  }
}
