import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';  // Import the Home layout component

const routes: Routes = [
    {
        path: '',
        component: HomeComponent, // Home layout component for the empty path
        // Ensures it matches the exact empty path
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
