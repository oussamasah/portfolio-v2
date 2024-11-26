import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import Swiper, { Pagination, Navigation } from 'swiper';

Swiper.use([Pagination, Navigation]);
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class EducationComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    new Swiper('.timeline .swiper-container', {
      direction: "vertical",
      autoplay: {
        delay: 3000, // Delay between transitions in milliseconds
        disableOnInteraction: false, // Keeps autoplay working even after user interaction
      },
      loop: true,
      initialSlide: 0,
      speed: 1600,
      pagination: {
        el: '#education-swiper .swiper-pagination-education',
        clickable: true,
        renderBullet: (index, className) => {
          const slides = document.querySelector('#education-swiper .slide-' + index);


          const year = slides?.getAttribute('data-year');

          console.log([index])
          return `<span class="${className}">${year}</span>`;
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          direction: 'horizontal',
        },
      },

    });
  }
}
