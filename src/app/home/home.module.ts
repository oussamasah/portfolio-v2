import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppComponent } from '../app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SliderComponent } from './slider/slider.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ServiceComponent } from './service/service.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { EducationComponent } from './education/education.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({

  declarations: [
    HomeComponent,
    SidebarComponent,
    SliderComponent,
    WelcomeComponent,
    ServiceComponent,
    AboutComponent,
    ContactComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    ProjectsComponent

  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CarouselModule,
    ButtonModule,
    AvatarModule,
    TabViewModule,
    BadgeModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
