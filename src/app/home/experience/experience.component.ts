import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import Swiper, { Pagination, Navigation } from 'swiper';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
  encapsulation: ViewEncapsulation.None,

})
export class ExperienceComponent implements AfterViewInit {
  private swiper: Swiper | null = null;
  ngAfterViewInit() {

    const swiper = new Swiper('.swiper-experience', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination-experience',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next-experience',
        prevEl: '.swiper-button-prev-experience',
      },
      breakpoints: {
        // Activate Swiper only for mobile
        768: {
          slidesPerView: 1,
        },
      },
    });
  }


}
