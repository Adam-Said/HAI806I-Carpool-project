import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Carpool } from '../models/carpool.model';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  carpools: Carpool[] = [];
  searchForm: FormGroup;
  filteredCountries: any[] = [];
  countries: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private countriesService: CountriesService
  ) {
    this.searchForm = this.formBuilder.group({
      departure: '',
      arrival: '',
      date: null,
      seats: 1
    });

    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    const departure = queryParams.get('departure');
    const arrival = queryParams.get('arrival');
    const date = queryParams.get('date');
    const seats = queryParams.get('seats');

    if (departure && arrival) {
      this.searchForm.patchValue({
        departure: departure,
        arrival: arrival,
        date: date ? new Date(date) : null,
        seats: seats ? parseInt(seats, 10) : 1
      });

      this.searchCarpools();
    }
  }

  searchCarpools() {
    const { departure, arrival, date, seats } = this.searchForm.value;

    // Make an HTTP request to search for carpool data
    this.apiService.searchCarpools(departure, arrival, date, seats).subscribe((data: Carpool[]) => {
      this.carpools = data;
      // Update the URL with the search parameters
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          departure: departure,
          arrival: arrival,
          date: date ? date.toISOString() : null,
          seats: seats
        },
        queryParamsHandling: 'merge'
      });
    });

  }

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
}
