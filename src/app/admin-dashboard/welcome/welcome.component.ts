import { Component, OnInit } from '@angular/core';
import { WelcomeService } from './welcome.service';
import { environment } from '../../../environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  title: string = ""
  tags: string = ""
  description: string = ""
  image: File | null = null;
  cv: File | null = null;
  thmubImg: string = "";
  thmubCv: string = "";
  message: string | undefined;
  error: string | undefined;

  ngOnInit(): void {
    this.get()
  }

  constructor(private welcomeService: WelcomeService) { }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.image = file;
    }
  }
  onCvSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.cv = file;
    }
  }

  get() {
    this.welcomeService.get().subscribe({
      next: (wlc: any) => {
        this.title = wlc.title;
        this.tags = wlc.tags.replaceAll(",", "\n");
        this.description = wlc.description;
        let endpoint = environment.apiUrl;

        endpoint = endpoint.replace(/\/+$/, '');;


        this.thmubImg = endpoint + wlc.image;
        this.thmubCv = endpoint + wlc.cv;

      },
      error: (err: any) => {

        this.error = `Error: ${err.message}`;
      }
    });
  }
  save() {
    this.welcomeService.save(this.title, this.tags, this.description, this.image, this.cv).subscribe({
      next: (event: any) => {
        // HttpEventType.Response
        this.message = event.message;
        setTimeout(() => {
          this.message = undefined;
        }, 10000);

      },
      error: (err: any) => {
        this.error = `Error: ${err.message}`;
        setTimeout(() => {
          this.error = undefined;
        }, 10000);
      }
    });
  }


}
