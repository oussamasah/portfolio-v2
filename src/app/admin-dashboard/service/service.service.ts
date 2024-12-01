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

    return this.http.get<any>(`${this.apiUrl}/gettitle`).pipe(
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

    return this.http.get<any>(`${this.apiUrl}/get`).pipe(
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


    return this.http.post<any>(`${this.apiUrl}/savetitle`, formData).pipe(
      tap((response) => {
        return { message: 'Service Title  saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }

  addservice(title: string, desc: string, icon: File | null) {
    let formData = new FormData();
    formData.append("title", title)
    formData.append("description", desc)
    if (icon) {
      formData.append("icon", icon)
    }



    return this.http.post<any>(`${this.apiUrl}/addservice`, formData).pipe(
      tap((response) => {
        return { message: 'Service Title  saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }
  updateservice(id: string, title: string, desc: string, icon: File | null) {
    let formData = new FormData();
    formData.append("title", title)
    formData.append("id", id)
    formData.append("description", desc)
    if (icon) {
      formData.append("icon", icon)
    }

    const token = localStorage.getItem('auth_token'); // Replace with your token storage method

    return this.http.put<any>(`${this.apiUrl}/update/${id}`, formData).pipe(
      tap((response) => {
        return { message: 'Service Title  saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }
  deleteservice(id: string) {


    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`).pipe(
      tap((response) => {
        return { message: 'Service deleted successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }
}
