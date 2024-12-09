import { TestimonialService } from './../../admin-dashboard/testimonial/testimonial.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ContactService } from '../../admin-dashboard/contact/contact.service';
import { environment } from '../../../environment';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent implements OnInit {
  ngOnInit(): void {
    this.getAll()
  }
  form: FormGroup;
  response_message:string=""
constructor(private fb:FormBuilder , private recaptchaV3Service: ReCaptchaV3Service, private testimonialService: TestimonialService,private homeservice :HomeService){
  this.form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+([ '-][a-zA-Z]+)*$")]],
    email: ['', [Validators.required, Validators.email, Validators.pattern("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    photo: [File, [Validators.required, this.fileTypeValidator(['image/jpeg', 'image/png']), this.fileSizeValidator(5 * 1024 * 1024)]],

  });
}
path: string = environment.apiUrl.replace(/\/+$/, '');
responsiveOptions = [
  {
    breakpoint: '1400px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '1220px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '1100px',
    numVisible: 1,
    numScroll: 1
  }
];
  isPopupVisible: boolean = false;
  formData = {
    name: '',
    email: '',
    description: '',
    photo: null as File | null
  };
  response_error:string=""
  fileTypeValidator(allowedTypes: string[]) {
    return (control: AbstractControl) => {
      const fileList: FileList = control.value;
  
      if (fileList && fileList.length > 0) {
        const file = fileList[0]; // Get the first file from the FileList
  
        if (file && !allowedTypes.includes(file.type)) {
          console.log("not valide",file.type)
          return { invalidFileType: true }; // Return error if the file type is not allowed
        }
        return null; // Return error if the file type is not allowed


      }
      return null; // Return null if validation passes
    };
  }
  
  
  // Validator for File Size
  fileSizeValidator(maxSize: number) {
    return (control: AbstractControl) => {
      const fileList: FileList = control.value;

      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        console.log(file?.size)
      if (file && file.size > maxSize) {
        return { fileSizeExceeded: true };
      }
      return null;
    }
    return null;

    };
  }
  openPopup() {
    this.isPopupVisible = true;
   
 
  }

  closePopup() {
    this.isPopupVisible = false;
 
  }

  onFileChange(event: any) {
      const input = event.target
  if (input.files && input.files.length > 0) {
    const file = input.files[0]; // Get the first file (assuming single file upload)
    this.form.get('photo')?.setValue(input.files); // Set the file(s) as the value of the form control
    this.formData.photo = file;
    console.log(this.formData.photo )

  }
 
  }

  submitForm(): void {

    if (this.form.valid) {

      console.log(this.form.value);

      let apiUrl = environment.apiUrl; // Adjust URL to your backend API

      this.recaptchaV3Service.execute('importantAction').subscribe((tokenc: string) => {
        this.homeservice.verifycaptcha(tokenc).subscribe({
          next: (response) => {
            console.log('Verification successful:', response);

             this.testimonialService.save(this.form).subscribe({
              next: (res) => {
                this.response_message = res.message

                setTimeout(()=>{
                  this.response_message = ""
                  this.closePopup()
                },5000)
             
                

              },
              error: (err) => {
                console.log(err)
                this.response_error = err.error.error

                setTimeout(()=>{

                   this.response_error = ""
                },5000)
              
               
              }
            }); 
          },
          error: (error) => {
            this.response_error = "Sorry, Testimonial not sended try later"
            console.error('Verification failed:', error);
          }
        });

      });
    }
    }
    items=[]
    getAll(){
      this.testimonialService.getActive().subscribe({
        next:(res)=>{
          this.items = res;
        }
      })
    }
}
