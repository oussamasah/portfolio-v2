import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import Isotope from 'isotope-layout';
import GLightbox from 'glightbox';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ProjectsComponent implements AfterViewInit {
  [x: string]: any;

  items: Array<{ src: string, category: string, description: string, title: string }> = [
    { src: 'https://picsum.photos/1200/900?random=1', category: 'category-1', description: "test", title: "title" },
    { src: 'https://picsum.photos/1200/900?random=2', category: 'category-2', description: "test", title: "title" },
    { src: 'https://picsum.photos/1200/900?random=3', category: 'category-1', description: "test", title: "title" },
    { src: 'https://picsum.photos/1200/900?random=4', category: 'category-2', description: "test", title: "title" },
    { src: 'https://picsum.photos/1200/900?random=5', category: 'category-3', description: "test", title: "title" },
    { src: 'https://picsum.photos/1200/900?random=6', category: 'category-3', description: "test", title: "title" },
    // Add more items as needed
  ];

  ngAfterViewInit() {
    // Initialize Isotope for filtering and layout
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
    const lightbox = GLightbox({
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
