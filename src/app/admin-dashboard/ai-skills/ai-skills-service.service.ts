import { skill } from './../skill/skill.component';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AiSkillsServiceService {


  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl + "api/skills";
  save(item: any) {
    let formData = new FormData();
    formData.append("skill", item.skill)
    formData.append("id", item.id)
    formData.append("active", item.active)
    formData.append("checked", item.checked)
    formData.append("multiword", item.multiword)
      formData.append("lang", item.lang)
    
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

    return this.http.get(this.apiUrl + "/get").pipe(
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
