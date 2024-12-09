import { HomeService } from './../home.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environment';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactService } from '../../admin-dashboard/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  form: FormGroup;
  response_message: String | undefined;
  response_error: String | undefined;
  captchaSiteKey: String = environment.captchaSiteKey;
  captchaToken: string | null = null;
  captchaError = false;


  constructor(private fb: FormBuilder, private recaptchaV3Service: ReCaptchaV3Service, private http: HttpClient, private contactService: ContactService,private homeservice:HomeService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+([ '-][a-zA-Z]+)*$")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")]],
      number: ['', [Validators.required, Validators.minLength(10),              // Minimum length of 10 digits
      Validators.maxLength(15), Validators.pattern("^\\+?[1-9]\\d{9,14}$")]],
      message: ['', [Validators.required, Validators.minLength(30)]]
    });
  }


  submitForm(): void {

    if (this.form.valid) {

      console.log(this.form.value);

      let apiUrl = environment.apiUrl; // Adjust URL to your backend API

      this.recaptchaV3Service.execute('importantAction').subscribe((tokenc: string) => {
        this.homeservice.verifycaptcha(tokenc).subscribe({
          next: (response:any) => {
            console.log('Verification successful:', response);

            this.contactService.sendform(this.form).subscribe({
              next: (res) => {
                console.log(res)
                this.response_message = "Thank you, Message sended Successfuly"
              },
              error: (err) => {
                console.log(err)
                this.response_error = "Sorry, Message not sended try later"

              }
            });
          },
          error: (error:any) => {
            this.response_error = "Sorry, Message not sended try later"
            console.error('Verification failed:', error);
          }
        });

      });
    }
  }


  verifyCaptcha(token: string): void {
    // Send the token to your backend for verification
    console.log('Token to verify:', token);
  }


}
