import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import Isotope from 'isotope-layout';
import GLightbox from 'glightbox';
import { ProjectService } from '../../admin-dashboard/project/project.service';
import { environment } from '../../../environment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ProjectsComponent implements AfterViewInit {

  constructor(private service: ProjectService) {

  }

  [x: string]: any;
  items: Array<{ id: number, src: string, project: string, description: string, title: string }> = []
  defaultItems: Array<{ id: number, src: string, project: string, description: string, title: string }> = [
    { id: 1, src: 'https://picsum.photos/1200/900?random=1', project: 'project-1', description: "test", title: "title" },
    { id: 1, src: 'https://picsum.photos/1200/900?random=2', project: 'project-2', description: "test", title: "title" },
    { id: 1, src: 'https://picsum.photos/1200/900?random=3', project: 'project-1', description: "test", title: "title" },
    { id: 1, src: 'https://picsum.photos/1200/900?random=4', project: 'project-2', description: "test", title: "title" },
    { id: 1, src: 'https://picsum.photos/1200/900?random=5', project: 'project-3', description: "test", title: "title" },
    { id: 1, src: 'https://picsum.photos/1200/900?random=6', project: 'project-3', description: "test", title: "title" },
    // Add more items as needed
  ];
  lightbox: any
  ngAfterViewInit() {
     this.getProjects()
    // Initialize Isotope for filtering and layout
    
  }
  categories: string[] = []
  getProjects() {
    this.service.get().subscribe({
      next: (event: any) => {
        if (event.data.length > 0) {
          let list = event.data.map((l: any) => {
            l.src = environment.apiUrl.replace(/\/+$/, '') + l.image;
            return l
          })
          console.log(list)
          
          this.items = list
          event.data.map((x: any) => {
            let proj: string = x.project
            if (!this.categories.includes(proj)) {
              this.categories.push(proj)
              setTimeout(()=>{
                this.initGallery()
              },500 )  

            }
          })
        } else {
          this.items = this.defaultItems;
          setTimeout(()=>{
            this.initGallery()
          },500)

        }
      },
      error: (err: any) => {
        this.items = this.defaultItems;
        setTimeout(()=>{
        this.initGallery()
      },500)
      }
    });

  }
  initGallery(){
 
    const iso = new Isotope('.isotope-container', {
      itemSelector: '.grid-item',
      layoutMode: 'fitRows', // Or 'masonry' based on your preference
    });

    // Add event listener for the filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach((button: any) => {
      button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });
      });
    });

    // Initialize GLightbox for the lightbox functionality
    this.lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,  // Enable touch navigation for mobile
      keyboardNavigation: true,  // Enable touch navigation for mobile
      loop: true,             // Enable looping through images
      zoomable: false,
      draggable: true,// Enable zoom effect
      skin: 'dark',           // Use dark skin for the lightbox
      slideEffect: 'slide',           // Use dark skin for the lightbox
      closeButton: true,           // Use dark skin for the lightbox
      closeOnOutsideClick: true,           // Use dark skin for the lightbox

    });
  }
}
