import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from "./user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private us:UserService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var w  = await this.us.logged();
        console.log("to jest to:");
        console.log(w);
        if (w) {
            // console.log(localStorage.getItem('currentUser'), route);
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
