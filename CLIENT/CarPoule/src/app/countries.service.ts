import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get<any[]>('assets/countries.json')
      .toPromise()
      .then((res: any) => {
          if(res){
            return <any[]>res;
          } else {
            console.error('Aucune réponse reçue de la requête HTTP.');
            return [];
          }
      })
      .then((data: any[]) => {
          const cities = data.map((country) => {
            return country.city;
          });
          return cities;
      });
    }
}
