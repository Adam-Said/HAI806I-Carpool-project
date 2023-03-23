import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

interface Carpool {
  id: number;
  driver: string;
  departure: string;
  arrival: string;
  date: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  carpools: Carpool[] = [];

  constructor(private apiService: ApiService) { }

  getCarpool(departure: string, arrival: string): Observable<Carpool[]> {
    return this.apiService.getCarpool(departure, arrival);
  }

  getCarpools() {
    const arrival = (<HTMLInputElement>document.getElementById('arrival')).value;
    const departure = (<HTMLInputElement>document.getElementById('departure')).value;

    /* this.getCarpool(departure, arrival).subscribe((data: Carpool[]) => {
      this.carpools = data;
    }); */
    console.log("Cocucou");

    this.apiService.getCarpooltest().subscribe((data: Carpool[]) => {
      this.carpools = data;
      console.log(this.carpools)
    });
  }
}