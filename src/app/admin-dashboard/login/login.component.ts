import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string | undefined;

  constructor(private authService: AuthService, private router: Router) {

  }
  async login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {

        this.router.navigate(['admin/blog']);
      },
      error: (err) => {
        this.error = 'Bad credentials';
      }
    });
  }
}
