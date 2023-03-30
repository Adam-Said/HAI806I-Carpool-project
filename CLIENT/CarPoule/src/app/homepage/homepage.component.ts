import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Carpool } from '../models/carpool.model';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  departure: string = '';
  arrival: string = '';
  date: string = '';
  seats: number = 1;

  constructor(private router: Router) { }

  searchCarpools(event: Event) {
    event.preventDefault();
    const queryParams = {
      departure: this.departure,
      arrival: this.arrival,
      date: this.date,
      seats: this.seats
    };
    this.router.navigate(['/search'], { queryParams });
  }
}
