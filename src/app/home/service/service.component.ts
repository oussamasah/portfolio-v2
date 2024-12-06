import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ServiceService } from '../../admin-dashboard/service/service.service';
import { environment } from '../../../environment';
import { ChangeDetectorRef } from '@angular/core';
interface Services {
  id?: string;
  title?: string;
  description?: String;
  icon?: string;
}
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {
  path: string = environment.apiUrl.replace(/\/+$/, '');

  services: Services[] = []
  dafeualtservices: Services[] = [
    {
      id: '1',
      title: 'Website Development',
      description: "I create modern, responsive, and SEO-friendly websites tailored to your needs. Using technologies like React.js and Angular 17, I ensure fast performance and seamless integration with CMS platforms like WordPress or custom solutions.",
      icon: "/assets/img/website.png",
    }, {
      id: '1',
      title: 'Mobile App Development',
      description: "I build cross-platform mobile apps with frameworks like Ionic, delivering smooth user experiences on iOS and Android. Whether it's a simple app or a complex solution, I ensure scalability and real-time functionality.",
      icon: "/assets/img/mobile.png",
    }, {
      id: '1',
      title: 'Platform Development',
      description: "I design and develop robust platforms for businesses, from SaaS solutions to internal tools. With advanced user management, role-based permissions, and real-time features, my platforms are secure, scalable, and reliable.",
      icon: "/assets/img/platforme.png",
    }, {
      id: '1',
      title: 'E-commerce Solutions',
      description: "I develop feature-rich e-commerce platforms with custom designs, payment gateway integrations (Stripe, PayPal, etc.), and tools for product management, inventory tracking, and analytics, ensuring a seamless shopping experience.",
      icon: "/assets/img/ecommerce.png",
    }, {
      id: '1',
      title: 'API Integration',
      description: "I specialize in integrating third-party APIs and developing custom RESTful or GraphQL APIs to connect your application with external services like Google APIs, payment gateways, or CRMs, ensuring smooth data flow and functionality.",
      icon: "/assets/img/api.png",
    }, {
      id: '1',
      title: 'Additional Services',
      description: "From optimizing web performance to managing databases and implementing multilingual solutions, I provide ongoing support to keep your project running efficiently and ready for growth.",
      icon: "/assets/img/self-employed.png",
    }

  ];
  error: string | undefined;
  title: string = "Bringing Your Vision to Life with Modern<br>Web Technologies"
  responsiveOptions: any[] | undefined;
  constructor(private serviceService: ServiceService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.getTitle()
    this.getServices()


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

  getServices() {
    this.serviceService.getServices().subscribe({
      next: (event: any) => {
        if (event.data && event.data.length > 0) {

          this.services.push(...event.data); // Make sure to assign a new reference to trigger change detection

        } else {
          this.services = this.dafeualtservices
        }
      },
      error: (err: any) => {
        this.services = this.dafeualtservices

        this.error = `Error: ${err.message}`;
        setTimeout(() => {
          this.error = undefined;
        }, 10000);
      }
    });

  }
}
