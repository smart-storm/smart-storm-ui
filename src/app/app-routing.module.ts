import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./helpers/auth.guard";
import { RegisterComponent } from "./register/register.component";
import { SensorsComponent } from './sensors/sensors.component';
import {StarterViewComponent} from "./inspinia/views/appviews/starterview.component";
import {BasicLayoutComponent} from "./inspinia/components/common/layouts/basicLayout.component";
import {ChartsComponent} from "./sensors/charts/charts.component";



const routes: Routes = [
    { path: '', redirectTo: 'sensors', pathMatch: 'full'},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'starterview', component:BasicLayoutComponent,
        children: [
        {path: '', component: StarterViewComponent}
        ]
    },

    {
        path: 'sensors', component: BasicLayoutComponent, canActivate: [AuthGuard],
        children: [
            {path: 'list', component: SensorsComponent},
            {path: 'charts', component: ChartsComponent}
        ]
    }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
