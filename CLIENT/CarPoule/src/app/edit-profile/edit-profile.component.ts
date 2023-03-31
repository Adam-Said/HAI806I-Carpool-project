import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    birthdate: new FormControl(new Date(), Validators.required),
    pref_animals: new FormControl(false, Validators.required),
    pref_talk: new FormControl(false, Validators.required),
    pref_smoking: new FormControl(false, Validators.required),
    vehicleBrand: new FormControl('', Validators.required),
    vehicleModel: new FormControl('', Validators.required),
    vehicleColor: new FormControl('', Validators.required),
    vehicleRegistration: new FormControl('', Validators.required),
    cardNumber: new FormControl('', Validators.required),
    cardCode: new FormControl('', Validators.required),
    expirationDate: new FormControl(new Date(), Validators.required)
  });




  Options: any[] = [
    { icon: 'sentiment_very_dissatisfied', value: false },
    { icon: 'sentiment_very_satisfied', value: true }
  ];

  constructor(private apiService: ApiService, private router: Router) { }


  ngOnInit(): void {
    this.apiService.getUserInfo().subscribe(
      (data) => {
        const user = data;
        this.formGroup = new FormGroup({
          name: new FormControl(user.name, Validators.required),
          firstname: new FormControl(user.firstname, Validators.required),
          email: new FormControl(user.email, [Validators.required, Validators.email]),
          phone: new FormControl(user.phone, [Validators.required]),
          birthdate: new FormControl(new Date(user.birthdate), Validators.required),
          pref_animals: new FormControl(user.pref_animals, Validators.required),
          pref_talk: new FormControl(user.pref_talk, Validators.required),
          pref_smoking: new FormControl(user.pref_smoking, Validators.required),
          vehicleBrand: new FormControl(user.vehicle.brand, Validators.required),
          vehicleModel: new FormControl(user.vehicle.model, Validators.required),
          vehicleColor: new FormControl(user.vehicle.color, Validators.required),
          vehicleRegistration: new FormControl(user.vehicle.registration, Validators.required),
          cardNumber: new FormControl(user.payment_method.card_num, Validators.required),
          cardCode: new FormControl(user.payment_method.card_cvc, Validators.required),
          expirationDate: new FormControl(new Date(user.payment_method.card_exp), Validators.required)
        });
      });

  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.apiService.updateUserInfo(this.formGroup.value).subscribe(
        (response: any) => {
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          console.error('Failed to update user:', error);
        }
      );
    }
  }
}
