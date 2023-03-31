import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from '../auth.guard';


@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css'],
})

export class NavbarComponentComponent {
  constructor(private authGuard: AuthGuard) { }

  isLoggedIn(): boolean {
    return this.authGuard.isLoggedIn();
  }

  logout(): void {
    this.authGuard.logout();
  }
}
