import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish-page',
  templateUrl: './publish-page.component.html',
  styleUrls: ['./publish-page.component.css']
})
export class PublishPageComponent implements OnInit {


  countries: any[] = [];

  formGroup!: FormGroup;

  filteredCountries: any[] = [];

  constructor(private countriesService: CountriesService, private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      date: [null, Validators.required],
      seats: [1, [Validators.required, Validators.min(1)]],
      highway: [true],
      price: [15, [Validators.required, Validators.min(1)]],
      description: ['', Validators.maxLength(300)]
    });


    this.countriesService.getCountries().then((cities) => {
      this.countries = cities;
      //console.log(JSON.stringify(this.countries));
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

  onSubmit() {

    if (this.formGroup.valid) {
      this.apiService.publishCarpool(this.formGroup.value).subscribe(
        (response: any) => {
          console.log('Carpool published:', response);
          this.router.navigate(['/trips']);
        },
        (error: any) => {
          console.error('Failed to publish carpool:', error);
        }
      );
    }
  }

}
