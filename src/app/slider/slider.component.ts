import { Component, OnInit } from '@angular/core';
import { Carousel } from 'flowbite';
import type { CarouselItem, CarouselOptions, CarouselInterface } from 'flowbite';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  
  ngOnInit(): void {
    
    // Get references to the carousel container and buttons
    const carouselContainer = document.getElementById('carouselContainer')!;


    // Initialize the carousel items
    const items: CarouselItem[] = [
      {
        position: 0,
        el: document.getElementById('carousel-item-1')!
      },
      {
        position: 1,
        el: document.getElementById('carousel-item-2')!
      },
      {
        position: 2,
        el: document.getElementById('carousel-item-3')!
      },
      {
        position: 3,
        el: document.getElementById('carousel-item-4')!
      },
    ];

    // Initialize the carousel options
    const options: CarouselOptions = {
      defaultPosition: 0,
      interval: 5000,
      // callback functions
      onNext: () => {
        this.updateActiveSlide('next');
      },
      onPrev: () => {
        this.updateActiveSlide('prev');
      },
      onChange: () => {
        console.log('new slider item has been shown');
      }
    };
    const carousel: CarouselInterface = new Carousel(carouselContainer,items, options);

    carousel.cycle();
    
  }
  currentSlide: number = 0;
  updateActiveSlide(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentSlide = (this.currentSlide + 1) % 4; // 4 is the number of slides
    } else if (direction === 'prev') {
      this.currentSlide = (this.currentSlide - 1 + 4) % 4; // Ensures it wraps around correctly
    }
  }
}
