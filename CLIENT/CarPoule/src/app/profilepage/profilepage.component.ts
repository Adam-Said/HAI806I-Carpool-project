import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  firstname: string = '';
  name: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';
  birthdate: Date = new Date();
  pref_animals: boolean = false;
  pref_talk: boolean = false;
  pref_smoking: boolean = false;
  vehicle: {
    brand: string;
    model: string;
    registration: string;
    color: string;
    seats: number;
  } = { brand: '', model: '', registration: '', color: '', seats: 0 };
  payment_method: {
    card_num: string;
    card_cvc: string;
    card_exp: Date;
  } = { card_num: '', card_cvc: '', card_exp: new Date() };

  constructor(private apiService: ApiService, private cookieService: CookieService) { }


  ngOnInit(): void {
    const token = this.cookieService.get('auth');
    this.apiService.getUserInfo().subscribe(
      (data) => {
        this.firstname = data.firstname;
        this.name = data.name;
        this.email = data.email;
        this.address = data.address;
        this.phone = data.phone;
        this.birthdate = new Date(data.birthdate);
        this.pref_animals = data.pref_animals;
        this.pref_talk = data.pref_talk;
        this.pref_smoking = data.pref_smoking;
        this.vehicle = data.vehicle;
        this.payment_method = data.payment_method;
      },
      (err) => {
        console.error(err);
      }
    );
  }

}
