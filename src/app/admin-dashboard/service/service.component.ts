import { ServiceService } from './service.service';
import { Component, OnInit } from '@angular/core';
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
  title: string = "Bringing Your Vision to Life with Modern Web Technologies";
  message: string | undefined = undefined;
  error: string | undefined = undefined;
  itemIdToDelete: number | null = null;  // Store the id of the item to be deleted
  isDeleteDialogOpen = false;  // Track if the delete dialog is open

  services: Services[] = [
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
    },

  ];
  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
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
  saveTitle() {
    this.serviceService.saveTitle(this.title).subscribe({
      next: (event: any) => {
        // HttpEventType.Response
        this.message = event.message;
        setTimeout(() => {
          this.message = undefined;
        }, 10000);

      },
      error: (err: any) => {
        this.error = `Error: ${err.message}`;
        setTimeout(() => {
          this.error = undefined;
        }, 10000);
      }
    });
  }

  isPopupVisible = false;
  editItem: any = null;
  items: any[] = [];
  formData = {
    title: '',
    description: '',
    icon: null
  };

  openPopup(item: any) {
    this.isPopupVisible = true;
    this.editItem = item;
    if (item) {
      this.formData = { ...item };
    } else {
      this.formData = {
        title: '',
        description: '',
        icon: null
      };
    }
  }

  closePopup() {
    this.isPopupVisible = false;
    this.editItem = null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.formData.icon = file;
  }
  getServices() {
    this.serviceService.getServices().subscribe({
      next: (event: any) => {
        console.log(event)
        this.services = event.data
      },
      error: (err: any) => {
        this.error = `Error: ${err.message}`;
        setTimeout(() => {
          this.error = undefined;
        }, 10000);
      }
    });

  }
  saveItem() {
    console.log("-------------", this.editItem)
    if (this.editItem) {
      console.log("-------------", this.editItem)

      this.serviceService.updateservice(this.editItem.id, this.formData.title, this.formData.description, this.formData.icon).subscribe({
        next: (event: any) => {
          // HttpEventType.Response
          this.message = event.message;
          setTimeout(() => {
            this.message = undefined;
          }, 10000);
          this.getServices()

        },
        error: (err: any) => {
          this.error = `Error: ${err.message}`;
          setTimeout(() => {
            this.error = undefined;
          }, 10000);
        }
      });
    } else {
      console.log("----nn---------", this.editItem)

      this.serviceService.addservice(this.formData.title, this.formData.description, this.formData.icon).subscribe({
        next: (event: any) => {
          // HttpEventType.Response
          this.message = event.message;
          setTimeout(() => {
            this.message = undefined;
          }, 10000);
          this.getServices()

        },
        error: (err: any) => {
          this.error = `Error: ${err.message}`;
          setTimeout(() => {
            this.error = undefined;
          }, 10000);
        }
      });


    }
    this.closePopup()
  }

  Delete(id: any): void {
    this.itemIdToDelete = id;
    this.isDeleteDialogOpen = true;  // Open the dialog
  }

  // Handle the delete action
  confirmDelete(): void {
    if (this.itemIdToDelete) {
      this.deleteservice(this.itemIdToDelete)
    }
  }

  // Handle cancel action
  cancelDelete(): void {
    this.isDeleteDialogOpen = false;  // Close the dialog
  }
  deleteservice(e: any) {
    this.serviceService.deleteservice(e).subscribe({
      next: (event: any) => {
        // HttpEventType.Response
        this.message = event.message;
        setTimeout(() => {
          this.message = undefined;
        }, 10000);
        this.getServices()
        this.isDeleteDialogOpen = false;  // Open the dialog


      },
      error: (err: any) => {
        this.error = `Error: ${err.message}`;
        setTimeout(() => {
          this.error = undefined;
        }, 10000);
      }
    });
  }
}
