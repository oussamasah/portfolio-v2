import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + 'api/auth'; // Adjust URL to your backend API
  private tokenKey = 'auth_token';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.loggedIn.next(true);
        this.setRole(response.role);
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.role.next(null);
    this.router.navigate(['admin/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  getRole(): string | null {
    return this.role.getValue();
  }

  setRole(role: string) {
    this.role.next(role);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
