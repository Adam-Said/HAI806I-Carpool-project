import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) { }

  onSubmit() {
    this.apiService.login(this.email, this.password)
      .subscribe(
        (response) => {
          // console.log('User logged in successfully');
          this.router.navigate(['/profile']);
          // Redirect to profile page
        },
        (error) => {
          // console.error('Failed to log in user : ' + error.message);
          this.snackBar.open('Wrong email or password', 'Retry', {
            duration: 3000
          });
        }
      );
  }
}
