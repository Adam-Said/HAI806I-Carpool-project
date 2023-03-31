import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';

@Component({
  selector: 'app-publish-page',
  templateUrl: './publish-page.component.html',
  styleUrls: ['./publish-page.component.css']
})
export class PublishPageComponent implements OnInit {


  countries: any[] = [];

  formGroup!: FormGroup;

  filteredCountries: any[] = [];

  constructor(private countriesService: CountriesService, private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      date: [null, Validators.required],
      seats: [1, [Validators.required, Validators.min(1)]],
      highway: [false],
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
        },
        (error: any) => {
          console.error('Failed to publish carpool:', error);
        }
      );
    }
  }

}
