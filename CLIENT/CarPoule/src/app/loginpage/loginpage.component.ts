import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit() {
    this.apiService.login(this.email, this.password)
      .subscribe(
        (response) => {
          console.log(response);
          console.log('User logged in successfully');
          this.router.navigate(['/profile']);
          // Redirect to profile page
        },
        (error) => {
          console.error('Failed to log in user : ' + error.message);
          // TODO: handle error (e.g., show an error message, clear form fields)
        }
      );
  }
}
