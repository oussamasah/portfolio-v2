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
import { ContactComponent } from './contact/contact.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor, errorInterceptor } from './auth/auth-interceptor.interceptor';
import { SkillComponent } from './skill/skill.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectComponent } from './project/project.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { AiSkillsComponent } from './ai-skills/ai-skills.component';




@NgModule({
  declarations: [
    AdminDashboardComponent,
    LoginComponent,
    BlogComponent,
    WelcomeComponent,
    ServiceComponent,
    ContactComponent,
    SkillComponent,
    ExperienceComponent,
    ProjectComponent,
    TestimonialComponent,
    AiSkillsComponent




  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminDashboardRoutingModule

  ],



})
export class AdminDashboardModule { }
