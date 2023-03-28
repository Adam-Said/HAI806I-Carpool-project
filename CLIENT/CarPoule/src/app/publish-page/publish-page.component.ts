import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-publish-page',
  templateUrl: './publish-page.component.html',
  styleUrls: ['./publish-page.component.css']
})
export class PublishPageComponent implements OnInit {

    countries: any[] = [];

    formGroup!: FormGroup;

    filteredCountries: any[] = [];

    constructor(private countriesService: CountriesService) {}

    ngOnInit() {

      this.formGroup = new FormGroup({
        checked: new FormControl<boolean>(false)
      });

      this.countriesService.getCountries().then((cities) => {
        this.countries = cities;
        //console.log(JSON.stringify(this.countries));
      });
    
      this.formGroup = new FormGroup({
        selectedCountry: new FormControl<object | null>(null)
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
}
