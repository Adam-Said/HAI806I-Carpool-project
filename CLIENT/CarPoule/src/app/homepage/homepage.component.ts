import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Carpool } from '../models/carpool.model';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  carpools: Carpool[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }
  
  retrieveTutorials(): void {
    this.apiService.getAll()
      .subscribe({
        next: (data) => {
          this.carpool = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  carpool?: Carpool[];

  // getCarpools(event: Event) {
  //   event.preventDefault();
  //   console.log('getCarpools() called');
  //   const arrival = (<HTMLInputElement>document.getElementById('arrival')).value;
  //   const departure = (<HTMLInputElement>document.getElementById('departure')).value;
  
  // }

  getAllCarpools() {
    this.retrieveTutorials();
  }
  
}