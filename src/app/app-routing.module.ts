import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'  // Ensures it matches the exact empty path '/'
  },
  {
    path: '**', // Catch-all route for unknown paths
    redirectTo: ''  // Redirect to home
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
