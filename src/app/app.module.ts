import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule, ConnectionBackend } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FormsModule }   from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import { AdvGrowlModule } from 'primeng-advanced-growl';
import {DataTableModule,SharedModule,DialogModule,ButtonModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { requestOptionsProvider }   from './helpers/default-request-options.service';

import { UserService } from './helpers/user.service';
import { DataService } from './helpers/data.service';
import { customHttpProvider } from "./helpers/custom-http";
import { AuthGuard } from "./helpers/auth.guard";

import { SensorsComponent } from './sensors/sensors.component';

import {DashboardsModule} from "./inspinia/views/dashboards/dashboards.module";
import {AppviewsModule} from "./inspinia/views/appviews/appviews.module";

// App modules/components
import {LayoutsModule} from "./inspinia/components/common/layouts/layouts.module";

//Socket IO
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { socketServiceProvider } from "./helpers/socket.service";
import { ChartsModule } from "./sensors/charts/charts.module";

const socketConfig: SocketIoConfig = { url: 'http://localhost:33855', options: {} };

@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      SensorsComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpModule,
      FormsModule,
      JsonpModule,
      AdvGrowlModule,
      DataTableModule,
      SharedModule,
      DialogModule,
      BrowserAnimationsModule,
      ButtonModule,
      DashboardsModule,
      LayoutsModule,
      AppviewsModule,
      ChartsModule,
      SocketIoModule.forRoot(socketConfig)
  ],
  providers: [
        requestOptionsProvider,
        UserService,
        DataService,
        customHttpProvider,
        AuthGuard,
    // SocketService,
        socketServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
