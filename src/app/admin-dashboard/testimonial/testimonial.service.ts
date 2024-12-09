import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  private apiUrl = environment.apiUrl + 'api/testimonial'; // Adjust URL to your backend API

  constructor(private http: HttpClient) { }


  save(
    form:FormGroup
  ) {
    const formData = new FormData();
  
    // Assuming form controls contain the necessary form data
    const name = form.get('name')?.value;
    const email = form.get('email')?.value;
    const description = form.get('message')?.value;
    const fileList = form.get('photo')?.value as FileList;  // Assuming photo is a file input
    
    // Append form data to FormData object
    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);
    
    if (fileList && fileList.length > 0) {
      const photo: File = fileList[0]; // Extract the first file
      formData.append('photo', photo);
    }
   


    return this.http.post<any>(`${this.apiUrl}/save`, formData).pipe(
      tap((response) => {
        return { message: 'Welcome data saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }
  get(){
    return this.http.get<any>(`${this.apiUrl}/get`).pipe(
      tap((response) => {
        return { message: 'Welcome data saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }
  getActive(){
    return this.http.get<any>(`${this.apiUrl}/getActive`).pipe(
      tap((response) => {
        return { message: 'Welcome data saved successfully' };
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    );
  }
  changeState(id:number,act:string){
    let data= new FormData()
    data.append("active",act)
    return this.http.put<any>(`${this.apiUrl}/changestate/${id}`,data).pipe(
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
