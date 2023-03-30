import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carpool } from './models/carpool.model';
import { User } from './models/user.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000';
  private TOKEN_KEY = '123';

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

  registerUser(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/signup`, user, { withCredentials: true });
  }

  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    return this.httpClient.post<any>(`${this.baseUrl}/login`, body, { withCredentials: true });
  }

  getUserInfo(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/profile`, {
      withCredentials: true
    });
  }

  publishCarpool(data: any): Observable<any> {
    console.log('data', data);
    return this.httpClient.put(`${this.baseUrl}/publish`, data, { withCredentials: true });
  }
}



