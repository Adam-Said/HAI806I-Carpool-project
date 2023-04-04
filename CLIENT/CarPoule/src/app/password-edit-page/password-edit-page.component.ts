import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-password-edit-page',
  templateUrl: './password-edit-page.component.html',
  styleUrls: ['./password-edit-page.component.css']
})
export class PasswordEditPageComponent {
  form: FormGroup = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit() {
    if (this.form.valid) {
      if (this.form.value.password !== this.form.value.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      this.apiService.updatePassword(this.form.value).subscribe(
        (response: any) => {
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          console.error('Failed to update user:', error);
        }
      );
    }
    else {
      alert('Please fill out the form');
    }
  }

}
