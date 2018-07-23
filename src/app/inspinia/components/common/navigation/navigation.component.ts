import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../../../helpers/user.service";
import 'jquery-slimscroll';

declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {

  constructor(private router: Router, private  _user: UserService) {}

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }

  getUserName(): string {
    var name = this._user.userData.user;
    if(name) return name;
    else return " --- ";
  }

  logout(): void {
    this._user.logout();
  }


}
