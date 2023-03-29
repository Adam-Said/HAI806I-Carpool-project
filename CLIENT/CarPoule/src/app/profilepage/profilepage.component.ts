import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent {
  public name: string = '';
  public firstname: string = '';
  public email: string = '';
  public address: string = '';
  public phone: string = '';
  public birthdate: Date = new Date();
  public pref_animals: boolean = false;
  public pref_talk: boolean = false;
  public pref_smoking: boolean = false;
  public vehicle: {
    brand: string | null,
    model: string | null,
    registration: string | null,
    color: string | null,
    place_number: number | null
  } = { brand: null, model: null, registration: null, color: null, place_number: null };

  constructor(private apiService: ApiService) {
    this.getUserInfo();
  }

  private getUserInfo() {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = JSON.parse(token).id;
      this.apiService.getUserInfo(userId).subscribe((data: any) => {
        this.name = data.name;
        this.firstname = data.firstname;
        this.email = data.email;
        this.address = data.address;
        this.phone = data.phone;
        this.birthdate = data.birthdate;
        this.pref_animals = data.pref_animals;
        this.pref_talk = data.pref_talk;
        this.pref_smoking = data.pref_smoking;
        this.vehicle = data.vehicle;
      });
    }
  }

}
