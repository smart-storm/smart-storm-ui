import {Component, OnInit} from '@angular/core';
import { UserService } from '../helpers/user.service';
import { AdvGrowlService } from 'primeng-advanced-growl';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styles: [`
        .logo-left {
            font-size: 80px;
            text-align: left;
        }
        
        .logo-right {
            font-size: 80px;
            text-align: right;
        }
        
    `]
})
export class LoginComponent implements OnInit {

    private security_token: String;
    private sub: Subscription;
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(private route: ActivatedRoute,
                private growlService: AdvGrowlService,
                private router: Router,
                private _user: UserService){

    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/sensors/charts';
    }

    login() {
        this.loading=true;
        this.sub = this._user.login(this.model.email, this.model.password).subscribe(res => {
            this.loading = false;
            this.router.navigate([this.returnUrl]);
        },error => {
            console.log(error);
            this.growlService.createErrorMessage('login_error',error);
            this.loading=false;
        });
    }

}
