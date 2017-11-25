import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./helpers/auth.guard";
import { RegisterComponent } from "./register/register.component";

import { SensorsComponent } from './sensors/sensors.component';


import {Dashboard1Component} from "./inspinia/views/dashboards/dashboard1.component";
import {Dashboard2Component} from "./inspinia/views/dashboards/dashboard2.component";
import {Dashboard3Component} from "./inspinia/views/dashboards/dashboard3.component";
import {Dashboard4Component} from "./inspinia/views/dashboards/dashboard4.component";
import {Dashboard41Component} from "./inspinia/views/dashboards/dashboard41.component";
import {Dashboard5Component} from "./inspinia/views/dashboards/dashboard5.component";

import {StarterViewComponent} from "./inspinia/views/appviews/starterview.component";
import {LoginComponent as LoginInspinia} from "./inspinia/views/appviews/login.component";

import {BlankLayoutComponent} from "./inspinia/components/common/layouts/blankLayout.component";
import {BasicLayoutComponent} from "./inspinia/components/common/layouts/basicLayout.component";
import {TopNavigationLayoutComponent} from "./inspinia/components/common/layouts/topNavigationLayout.component";

const routes: Routes = [
  { path: '', redirectTo: 'sensors', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'sensors', component: SensorsComponent, canActivate: [AuthGuard] },

    {
        path: 'dashboards', component: BasicLayoutComponent,
        children: [
            {path: 'dashboard1', component: Dashboard1Component},
            {path: 'dashboard2', component: Dashboard2Component},
            {path: 'dashboard3', component: Dashboard3Component},
            {path: 'dashboard4', component: Dashboard4Component},
            {path: 'dashboard5', component: Dashboard5Component}
        ]
    }
    // {
    //     path: 'dashboards', component: TopNavigationLayoutComponent,
    //     children: [
    //         {path: 'dashboard41', component: Dashboard41Component}
    //     ]
    // },
    // {
    //     path: '', component: BasicLayoutComponent,
    //     children: [
    //         {path: 'starterview', component: StarterViewComponent}
    //     ]
    // },
    // {
    //     path: '', component: BlankLayoutComponent,
    //     children: [
    //         { path: 'login', component: LoginComponent },
    //     ]
    // },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
