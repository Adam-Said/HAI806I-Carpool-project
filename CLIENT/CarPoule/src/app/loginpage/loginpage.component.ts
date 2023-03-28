import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

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
          console.log('User logged in successfully');
          const token = response.headers.get('auth');
          localStorage.setItem('auth', token);
          // Redirect to profile page
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Failed to log in user');
          // TODO: handle error (e.g., show an error message, clear form fields)
        }
      );
  }
}
