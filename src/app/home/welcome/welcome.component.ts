import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WelcomeService } from '../../admin-dashboard/welcome/welcome.service';
import { environment } from '../../../environment';
import { lastValueFrom } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements AfterViewInit {
  constructor(private welcomeService: WelcomeService) { }
  title: string = "HI, I'M OUSSAMA! <br>CREATIVE"
  tags: Array<string> | string = ["Developer", "FullStack", "TechLead", "FreeLancer"]
  description: string = "Senior Web Developer with over 7 years of experience creating high-performance web solutions. Proficient in many frameworks and API integrations (Google, Facebook), I specialize in designing exceptional user experiences. Combining creativity with technical expertise, I am dedicated to driving the success of your team."
  image: File | null = null;
  cv: File | null = null;
  thmubImg: string = "/assets/img/profile.png";
  thmubCv: string = "/assets/files/cv.pdf";
  async ngAfterViewInit(): Promise<void> {
    await this.get()
    const elts = {
      text1: document.getElementById("text1")!,
      text2: document.getElementById("text2")!
    };

    // Check if elements exist
    if (!elts.text1 || !elts.text2) {
      console.error("Required elements not found in the DOM.");
      return;  // Exit early if elements are not found
    }

    const texts = this.tags;
    console.log(this.tags)
    console.log(texts)
    const morphTime = 1;
    const cooldownTime = 0.25;

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0.5;
    let cooldown = cooldownTime;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    }

    function setMorph(fraction: any) {
      elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      fraction = 1 - fraction;
      elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      elts.text1.textContent = texts[textIndex % texts.length];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
      morph = 0;

      elts.text2.style.filter = "";
      elts.text2.style.opacity = "100%";

      elts.text1.style.filter = "";
      elts.text1.style.opacity = "0%";
    }

    function animate() {
      requestAnimationFrame(animate);

      let newTime = new Date();
      let shouldIncrementIndex = cooldown > 0;
      let dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }

        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();
  }


  async get(): Promise<void> {
    try {
      const wlc: any = await lastValueFrom(this.welcomeService.get());

      this.title = wlc.title;
      this.tags = wlc.tags.split(",");
      this.description = wlc.description;
      let endpoint = environment.apiUrl;

      endpoint = endpoint.replace(/\/+$/, '');

      this.thmubImg = endpoint + wlc.image;
      this.thmubCv = endpoint + wlc.cv;
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
    }
  }

}




