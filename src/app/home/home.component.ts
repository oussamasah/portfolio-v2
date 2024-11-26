import { AfterViewInit, Component } from '@angular/core';
import AOS from 'aos'
declare var $: any;
import 'aos/dist/aos.css';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  title = 'angular';
  isActive = true;
  private sections: HTMLElement[] = [];
  private currentSectionIndex = 0;
  ngAfterViewInit(): void {


    $.scrollify({
      section: ".page",
      sectionName: "section-name",
      interstitialSection: "",
      easing: "easeInOutQuart",
      scrollSpeed: 2000,
      offset: 10,
      scrollbars: true,
      standardScrollElements: "",
      setHeights: true,
      overflowScroll: true,
      updateHash: false,
      touchScroll: true,
      before: function () { },
      after: function () { },
      afterResize: function () { },
      afterRender: function () { }
    })

    AOS.init();



  }
  onDataReceived(data: boolean) {
    this.isActive = data; // Update the variable with data from child
  }

}
