import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class WelcomeService {
  private apiUrl = environment.apiUrl + 'api/welcome'; // Adjust URL to your backend API

  constructor(private http: HttpClient) { }
  get() {
    const token = localStorage.getItem('auth_token'); // Replace with your token storage method
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/get`, { headers }).pipe(
      tap((response) => {
        return { message: 'Welcome saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }

  save(
    title: string,
    tags: string,
    description: string,
    image: File | null,
    cv: File | null
  ) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('tags', tags.replaceAll("\n", ","));
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    if (cv) {
      formData.append('cv', cv);
    }

    const token = localStorage.getItem('auth_token'); // Replace with your token storage method
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/save`, formData, { headers }).pipe(
      tap((response) => {
        return { message: 'Welcome data saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }
}
