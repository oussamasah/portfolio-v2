import { catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl + "api/project";
  save(item: any) {
    let formData = new FormData();
    formData.append("title", item.title)
    formData.append("id", item.id)
    formData.append("project", item.project)
    formData.append("description", item.description)
    if (item.image) {
      formData.append("image", item.image)
    }
    return this.http.post(this.apiUrl + "/save", formData).pipe(
      tap((res) => {
        return { message: "Data saved successfuly" }
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })

    )
  }

  get() {

    return this.http.get(this.apiUrl + "/getAll").pipe(
      tap((res) => {
        return { message: "Data saved successfuly" }
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })

    )
  }
  delete(id:string) {

    return this.http.delete(this.apiUrl + "/delete/"+id).pipe(
      tap((res) => {
        return { message: "Data deleted successfuly" }
      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })

    )
  }
}
