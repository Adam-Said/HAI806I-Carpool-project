import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
        const token = localStorage.getItem('token');
        if (!token) {
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
                localStorage.removeItem('token');
                throw new Error('Token expired');
            }
            // const verifiedToken: any = jwt.verify(token, '123');
            // if (!verifiedToken) {
            //     throw new Error('Invalid token');
            // }
            return true;
        } catch (error) {
            console.log(error);
            this.router.navigate(['/login']);
            return false;
        }
    }
}
