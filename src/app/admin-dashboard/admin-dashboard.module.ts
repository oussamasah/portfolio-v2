import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth/auth.service';
import { BlogComponent } from './blog/blog.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ServiceComponent } from './service/service.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    LoginComponent,
    BlogComponent,
    WelcomeComponent,
    ServiceComponent




  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminDashboardRoutingModule,

  ],


})
export class AdminDashboardModule { }
