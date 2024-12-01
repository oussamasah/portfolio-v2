import { ExperienceService } from './../../admin-dashboard/experience/experience.service';
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swiper, { Pagination, Navigation } from 'swiper';
import { experience } from '../../admin-dashboard/experience/experience.component';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
  encapsulation: ViewEncapsulation.None,

})
export class ExperienceComponent implements AfterViewInit, OnInit {
  constructor(private service: ExperienceService) {

  }
  items: experience[] = []
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1220px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1100px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  defaultitems: experience[] = [
    {
      "id": 3,
      "name": "SHYRINPROD - Tunisia",
      "daterange": "2020 - 2024",
      "description": "At SHYRINPROD, I developed an oil mill management app (Java, Swing, AccessDB) to optimize workflows. I created RankBoost, an SEO platform (ExpressJS, ReactJS, MongoDB), boosting user visibility by 25%. I also built YellowSmith, a website builder (GrapesJS) with a focus on performance and security. Agile Scrum and advanced security measures (CryptoJS, JWT, AES) ensured quality and collaboration."
    },
    {
      "id": 4,
      "name": "DegitalProd - Tunisia",
      "daterange": "2017 - 2020",
      "description": "At DegitalProd, I developed custom WordPress plugins and responsive designs using PHP, JavaScript, HTML, and CSS. I tailored features to client needs, ensuring seamless design integration and optimization. My work prioritized enhancing user experiences with efficient, scalable solutions. Each project reflected a balance of creativity and technical precision."
    },
    {
      "id": 5,
      "name": "Argonautes - Tunisia pp",
      "daterange": "2016 - 2017",
      "description": "At Argonautes, I created interactive animated presentations using JavaScript, jQuery, HTML, and CSS. I integrated responsive designs with Bootstrap, ensuring alignment with provided mockups. My focus was on delivering user-friendly, visually engaging solutions. Each project balanced creativity with technical accuracy to meet client expectations."
    }
  ]
  ngOnInit(): void {
    this.getAll()

    const swiper = new Swiper('.swiper-experience', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: true
      },
      pagination: {
        el: '.swiper-pagination-experience',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next-experience',
        prevEl: '.swiper-button-prev-experience',
      },
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      },

    });
  }
  private swiper: Swiper | null = null;
  ngAfterViewInit() {

  }

  getAll() {
    this.service.getExperience().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {

          this.items.push(...res.data);
        } else {
          this.items.push(...this.defaultitems);
        }
        console.log(this.items)
      }
    })
  }
}
