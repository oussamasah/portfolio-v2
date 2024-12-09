import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
import { SkillComponent } from './skill/skill.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectComponent } from './project/project.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { AiSkillsComponent } from './ai-skills/ai-skills.component';
const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
      { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
      { path: 'service', component: ServiceComponent, canActivate: [AuthGuard] },
      { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
      { path: 'skill', component: SkillComponent, canActivate: [AuthGuard] },
      { path: 'experience', component: ExperienceComponent, canActivate: [AuthGuard] },
      { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
      { path: 'testimonial', component: TestimonialComponent, canActivate: [AuthGuard] },
      { path: 'ai-skills', component: AiSkillsComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule { }
