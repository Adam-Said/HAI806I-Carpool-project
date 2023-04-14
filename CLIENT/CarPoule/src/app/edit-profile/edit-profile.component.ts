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
    vehicleBrand: new FormControl(''),
    vehicleModel: new FormControl(''),
    vehicleColor: new FormControl(''),
    vehicleRegistration: new FormControl(''),
    cardNumber: new FormControl(''),
    cardCode: new FormControl(''),
    expirationDate: new FormControl(new Date())
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
        this.formGroup.patchValue({
          name: user.name,
          firstname: user.firstname,
          email: user.email,
          phone: user.phone,
          birthdate: new Date(user.birthdate),
          pref_animals: user.pref_animals,
          pref_talk: user.pref_talk,
          pref_smoking: user.pref_smoking,
          vehicleBrand: user.vehicle.brand,
          vehicleModel: user.vehicle.model,
          vehicleColor: user.vehicle.color,
          vehicleRegistration: user.vehicle.registration,
          cardNumber: user.payment_method.card_num,
          cardCode: user.payment_method.card_cvc,
          expirationDate: user.payment_method.card_exp ? new Date(user.payment_method.card_exp) : new Date()
        });
        this.formGroup.updateValueAndValidity();
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
