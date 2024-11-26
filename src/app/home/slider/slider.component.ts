import { Component, OnInit } from '@angular/core';
import { Carousel } from 'flowbite';
import type { CarouselItem, CarouselOptions, CarouselInterface } from 'flowbite';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

  currentSlide: number = 0;
  updateActiveSlide(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentSlide = (this.currentSlide + 1) % 4; // 4 is the number of slides
    } else if (direction === 'prev') {
      this.currentSlide = (this.currentSlide - 1 + 4) % 4; // Ensures it wraps around correctly
    }
  }
}
