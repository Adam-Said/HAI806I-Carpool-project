import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
  image: File | undefined;
  user: User = new User();
  regForm: any = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirmation: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    birthdate: new FormControl('', [Validators.required]),
    pref_animals: new FormControl('', [Validators.required]),
    pref_talk: new FormControl('', [Validators.required]),
    pref_smoking: new FormControl('', [Validators.required]),
    profile_pic: new FormControl(''),
  });

  Options: any[] = [
    { icon: 'sentiment_very_dissatisfied', value: 0 },
    { icon: 'sentiment_very_satisfied', value: 1 }
  ];

  constructor(private apiService: ApiService, private router: Router) { }
  onSubmit() {
    // Assign form input values to user object properties
    this.user.firstname = this.regForm.get('firstname').value;
    this.user.name = this.regForm.get('name').value;
    this.user.email = this.regForm.get('email').value;
    this.user.password = this.regForm.get('password').value;
    this.user.phone = this.regForm.get('phone').value.toString();
    // Convert birthdate to string in "yyyy-mm-dd" format
    const birthdate = new Date(this.regForm.get('birthdate').value);
    this.user.birthdate = birthdate.toISOString();
    // Set pref_animals to true if the selected option is 1, false otherwise
    this.user.pref_animals = this.regForm.get('pref_animals').value === '1' ? true : false;
    // Set pref_talk to true if the selected option is 1, false otherwise
    this.user.pref_talk = this.regForm.get('pref_talk').value === '1' ? true : false;
    // Set pref_smoking to true if the selected option is 1, false otherwise
    this.user.pref_smoking = this.regForm.get('pref_smoking').value === '1' ? true : false;


    // call the API service to register the user
    this.apiService.registerUser(this.user)
      .subscribe(
        (data) => {
          // console.log('User registered successfully');
          // Redirect to profile page
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Failed to register user');
          // TODO: handle error (e.g., show an error message, clear form fields)
        }
      );
  }

  fileChoosen(event: any) {
    if (event.target.value) {
      this.image = <File>event.target.files[0];
    }
  }

}
