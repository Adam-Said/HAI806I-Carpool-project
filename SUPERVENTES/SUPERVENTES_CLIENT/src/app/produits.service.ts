import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":  "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};
*/

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

    private urlBase: string = 'http://localhost:8888/';

    constructor(private http: HttpClient) { }

    getProduits(): Observable<any> {
        return this.http.get(this.urlBase+'produits');
    }

    getProduitsParCategorie(categorie): Observable<any> {
        return this.http.get(this.urlBase+'produits/'+categorie);
    }

    getCategories(): Observable<any> {
        return this.http.get(this.urlBase+'categories');
    }
}
