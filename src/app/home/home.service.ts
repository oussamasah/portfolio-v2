import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http :HttpClient) { }
  apiUrl = environment.apiUrl; // Adjust URL to your backend API

  verifycaptcha(token: string) {

    return this.http.post(`${this.apiUrl}api/recaptcha/verify`, { token }).pipe(
      tap((response) => {
        return { message: 'Captcha verified successfully' };
      }),
      catchError((error) => {
        console.error('captcha failed:', error);
        return throwError(() => error);
      })
    );
  }
}
