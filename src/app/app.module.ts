
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SliderComponent } from './home/slider/slider.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { ServiceComponent } from './home/service/service.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './home/contact/contact.component';
import { SkillsComponent } from './home/skills/skills.component';
import { AvatarModule } from 'primeng/avatar';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { ExperienceComponent } from './home/experience/experience.component';
import { EducationComponent } from './home/education/education.component';
import { ProjectsComponent } from './home/projects/projects.component';
import { HomeModule } from './home/home.module';
import { AuthService } from './admin-dashboard/auth/auth.service';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, errorInterceptor } from './admin-dashboard/auth/auth-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,





  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    )
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
