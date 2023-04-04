import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Carpool } from '../models/carpool.model';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountriesService } from '../countries.service';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  countries: any[] = [];

  formGroup!: FormGroup;

  filteredCountries: any[] = [];
  
  departure: string = '';
  arrival: string = '';
  date: string = '';
  seats: number = 1;

  constructor(private countriesService: CountriesService, private router: Router) { }

  filterCountry(event: { query: any; }) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  ngOnInit() {
    this.countriesService.getCountries().then((cities) => {
      this.countries = cities;
      //console.log(JSON.stringify(this.countries));
    });

  }

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
