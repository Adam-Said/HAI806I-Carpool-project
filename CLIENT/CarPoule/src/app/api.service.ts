import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carpool } from './models/carpool.model';


const BASE_URL = 'http://localhost:3000'; // replace with your server URL

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Carpool[]> {
    return this.http.get<Carpool[]>(`${BASE_URL}/search/`);
  }

  getCarpool(departure: string, arrival: string): Observable<Carpool[]> {
    const url = `${BASE_URL}/search/${departure}/${arrival}`;
    return this.http.get<Carpool[]>(url);
  }
  
  getCarpooltest(): Observable<Carpool[]> {
    const url = `${BASE_URL}/search`;
    return this.http.get<Carpool[]>(url);
  }
  
}
