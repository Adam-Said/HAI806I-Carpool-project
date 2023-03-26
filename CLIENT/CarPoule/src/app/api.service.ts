import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carpool } from './models/carpool.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Carpool[]> {
    const url = `${this.baseUrl}/search`;
    return this.httpClient.get<Carpool[]>(url);
  }

  searchCarpools(departure: string, arrival: string, date: string, seats: number): Observable<Carpool[]> {
    const url = `${this.baseUrl}/search/${departure}/${arrival}`;
    let params = new HttpParams();
    if (date) {
      params = params.append('date', date);
    }
    if (seats) {
      params = params.append('seat', seats.toString());
    }
    return this.httpClient.get<Carpool[]>(url, { params });
  }
}
