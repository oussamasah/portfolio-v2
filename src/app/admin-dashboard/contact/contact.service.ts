import { Nullable } from 'primeng/ts-helpers';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = environment.apiUrl; // Adjust URL to your backend API

  constructor(private http: HttpClient) { }
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
  sendform(form: FormGroup) {

    return this.http.post(`${this.apiUrl}api/contact/save`, form.value).pipe(
      tap((response) => {
        return { message: 'Contact saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }
  getContacts() {

    return this.http.get(`${this.apiUrl}api/contact/getcontact`).pipe(
      tap((response) => {
        return { message: 'Contact saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }

  seen(id: string | Nullable) {

    return this.http.put(`${this.apiUrl}api/contact/seen/${id}`, {}).pipe(
      tap((response) => {
        return { message: 'Contact seen successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }


}
