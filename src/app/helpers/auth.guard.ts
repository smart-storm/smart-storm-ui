import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from "./user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private us:UserService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let check  = await this.us.logged2();

         if(!check) this.router.navigate(['/login'], {
             queryParams: { returnUrl: state.url },
             skipLocationChange: true
         });

        return check;
    }
}
