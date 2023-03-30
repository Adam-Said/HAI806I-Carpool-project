import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private cookieService: CookieService) { }

    canActivate(): boolean {
        const token = this.cookieService.get('auth');
        if (!token) {
            console.log('No token found');
            this.router.navigate(['/login']);
            return false;
        }
        try {
            const decodedToken: any = jwt_decode(token);
            if (!decodedToken.id) {
                throw new Error('Invalid token');
            }
            const expiry = decodedToken.exp;
            if (expiry < Date.now() / 1000) {
                this.cookieService.delete('auth');
                throw new Error('Token expired');
            }
            return true;
        } catch (error) {
            console.log(error);
            this.router.navigate(['/login']);
            return false;
        }
    }

}
