import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carpool } from './models/carpool.model';
import { User } from './models/user.model';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';


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

  updateUserInfo(data: any): Observable<any> {
    const body = {
      firstname: data.firstname,
      name: data.name,
      email: data.email,
      phone: data.phone,
      birthdate: data.birthdate,
      pref_animals: data.pref_animals,
      pref_talk: data.pref_talk,
      pref_smoking: data.pref_smoking,
      brand: data.vehicleBrand,
      model: data.vehicleModel,
      color: data.vehicleColor,
      registration: data.vehicleRegistration,
      card_num: data.cardNumber,
      card_cvc: data.cardCode,
      card_exp: data.cardExpiration
    }
    return this.httpClient.post<any>(`${this.baseUrl}/profile/edit`, body, { withCredentials: true });
  }

  publishCarpool(data: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/publish`, data, { withCredentials: true });
  }

  getTrips(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/trips`, { withCredentials: true });
  }

  getCarpool(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/carpool/${id}`, { withCredentials: true });
  }

  getPending(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/pending/${id}`, { withCredentials: true });
  }

  acceptPending(idCarpool: string, idPassenger: string): Observable<any> {
    const body = { carpool_id: idCarpool, passenger_id: idPassenger };
    return this.httpClient.post<any>(`${this.baseUrl}/pending/accept`, body, { withCredentials: true });
  }

  rejectPending(idCarpool: string, idPassenger: string): Observable<any> {
    const body = { carpool_id: idCarpool, passenger_id: idPassenger };
    return this.httpClient.post<any>(`${this.baseUrl}/pending/reject`, body, { withCredentials: true });
  }

  bookSeat(idCarpool: string): Observable<any> {
    const body = { carpool_id: idCarpool };
    return this.httpClient.post<any>(`${this.baseUrl}/carpool/` + idCarpool + `/book`, body, { withCredentials: true });
  }
}



