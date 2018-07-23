import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../../helpers/app.helpers';
import { UserService } from "../../../../helpers/user.service";

declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  constructor(private _user:UserService){}

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  logout(): void {
    this._user.logout();
  }

}
