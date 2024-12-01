import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { tap, catchError, throwError } from 'rxjs';
import { skill } from './skill.component';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = environment.apiUrl + 'api/skill'; // Adjust URL to your backend API

  constructor(private http: HttpClient) {
  }

  saveSkill(form: skill) {
    let formData = new FormData();

    formData.append("name", form.name)
    formData.append("category", form.category)
    formData.append("id", String(form.id))

    if (form.icon) {
      formData.append("icon", form.icon)
    }
    console.log(formData)
    return this.http.post(this.apiUrl + '/save', formData).pipe(
      tap((res) => {
        return { message: 'Welcome saved successfully' };

      }),
      catchError((error) => {
        console.error('Save failed:', error);
        return throwError(() => error);
      })
    )

  }
  getSkills() {
    return this.http.get(this.apiUrl + "/getAll").pipe(
      tap((res) => {
        return { mesaage: "skilles fethed" }
      },
        catchError((err) => {
          return throwError("failed to fetch skills")
        })

      )
    )
  }
  deleteSkill(id: string) {
    return this.http.delete(this.apiUrl + "/delete/" + id).pipe(
      tap((res) => {
        return { mesaage: "skilles fethed" }
      },
        catchError((err) => {
          return throwError("failed to fetch skills")
        })

      )
    )
  }

}
