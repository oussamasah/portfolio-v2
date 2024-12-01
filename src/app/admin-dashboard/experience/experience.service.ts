import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { experience } from './experience.component';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl + "api/experience"
  saveExperience(data: experience) {
    return this.http.post(this.apiUrl + "/save", data).pipe(
      tap((res) => {
        return { message: "data saved successfuly" }
      }),
      catchError((err) => {
        return throwError({ error: "error occured" })
      })
    )

  }
  getExperience() {
    return this.http.get(this.apiUrl + "/getAll").pipe(
      tap((res) => {
        return { message: "Experience fetched successfuly" }
      }),
      catchError((err) => {
        return throwError("Error fetching data")
      })
    )
  }

  deleteExperience(id: string) {
    return this.http.delete(this.apiUrl + "/delete/" + id).pipe(
      tap((res) => {
        return { message: "Experience deleted succesfuly" }
      }),
      catchError((err) => {
        return throwError("Error delete data")
      })
    )

  }
}
