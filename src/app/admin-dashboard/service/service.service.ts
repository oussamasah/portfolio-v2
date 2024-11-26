import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  private apiUrl = environment.apiUrl + 'api/service'; // Adjust URL to your backend API

  constructor(private http: HttpClient) { }
  getTitle() {
    const token = localStorage.getItem('auth_token'); // Replace with your token storage method
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/gettitle`, { headers }).pipe(
      tap((response) => {
        return { message: 'Welcome saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }
  getServices() {
    const token = localStorage.getItem('auth_token'); // Replace with your token storage method
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/getservices`, { headers }).pipe(
      tap((response) => {
        return { message: 'Welcome saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }

  saveTitle(
    title: string

  ) {
    const formData = new FormData();
    formData.append('title', title);


    const token = localStorage.getItem('auth_token'); // Replace with your token storage method
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/savetitle`, formData, { headers }).pipe(
      tap((response) => {
        return { message: 'Service Title  saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }
}
