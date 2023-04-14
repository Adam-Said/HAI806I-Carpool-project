import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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


  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) { }

  onSubmit() {
    if (this.form.valid) {
      if (this.form.value.password !== this.form.value.confirmPassword) {
        this.snackBar.open('Password mismatch', 'Retry', {
          duration: 3000
        });
        return;
      }

      this.apiService.updatePassword(this.form.value).subscribe(
        (response: any) => {
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          this.snackBar.open(error.error, 'Retry', {
            duration: 3000
          });
        }
      );
    }
    else {
      this.snackBar.open('Please fill the form', 'Retry', {
        duration: 3000
      });
    }
  }

}
