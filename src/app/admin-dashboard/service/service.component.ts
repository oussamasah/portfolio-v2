import { ServiceService } from './service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {
  title: string = "Bringing Your Vision to Life with Modern Web Technologies";
  message: string | undefined = undefined;
  error: string | undefined = undefined;

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getTitle()
  }

  getTitle() {
    this.serviceService.getTitle().subscribe({
      next: (event: any) => {
        this.title = event.title
      },
      error: (err: any) => {

      }
    })
  }
  saveTitle() {
    this.serviceService.saveTitle(this.title).subscribe({
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
