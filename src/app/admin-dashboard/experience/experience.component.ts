import { Component } from '@angular/core';
import { Nullable } from 'primeng/ts-helpers';
import { ExperienceService } from './experience.service';

export interface experience {
  id: number | null,
  name: string,
  daterange: string,
  description: string
}
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {

  item: experience = {
    id: null,
    name: '',
    daterange: "",
    description: ""
  };
  filtered: any = [];
  filter: string = "";
  items: experience[] = []
  editItem: experience | Nullable = null;
  message: string | undefined;
  error: string | undefined;
  isPopupVisible: boolean = false;
  constructor(private service: ExperienceService) {

  }
  ngOnInit(): void {
    this.getAll()
  }

  openPopup(item: any) {
    this.isPopupVisible = true;
    if (item && item.id != 0) {
      this.item = item;

    }


  }
  filterData(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value;
    console.log('Filter value:', filterValue);
    this.filter = filterValue.toLowerCase()
    console.log(this.items.filter(i => i.name.toLowerCase().includes(this.filter)))
    this.filtered = this.items.filter(i => i.name.toLowerCase().includes(this.filter))
    // Perform filtering logic here
  }

  closePopup() {
    this.isPopupVisible = false;
    this.editItem = null;
    this.item = {
      id: null,
      name: '',
      daterange: "",
      description: ""
    };
  }




  saveExperience() {
    if (this.item.name.length > 0 && this.item.description.length > 0 && this.item.daterange.length > 0) {


      console.log(this.item)
      this.service.saveExperience(this.item).subscribe({
        next: (res) => {
          this.message = "Experience saved successfuly"
          this.getAll()
          setTimeout(() => {
            this.message = undefined;
            this.closePopup()
          }, 2000);

        },
        error: (err) => {
          this.error = "Experience not saved"
          setTimeout(() => {
            this.error = undefined;
          }, 2000);
        }
      })
    } else {
      console.log(this.item)
      this.error = "Verify your data"
      setTimeout(() => {
        this.error = undefined;
      }, 1000);
    }
  }
  getAll() {
    this.service.getExperience().subscribe({
      next: (res: any) => {

        this.items = res.data


      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  isDeleteDialogOpen = false
  itemIdToDelete: string | undefined;
  Delete(id: any): void {
    this.itemIdToDelete = id;
    this.isDeleteDialogOpen = true;  // Open the dialog
  }

  // Handle the delete action
  confirmDelete(): void {
    if (this.itemIdToDelete) {
      this.deleteservie(this.itemIdToDelete)
    }
  }

  // Handle cancel action
  cancelDelete(): void {
    this.isDeleteDialogOpen = false;  // Close the dialog
  }
  deleteservie(id: string) {
    this.service.deleteExperience(id).subscribe({
      next: (data) => {
        this.message = "Experience successfuly deleted"
        this.getAll()
        this.isDeleteDialogOpen = false;
      }
    })
  }
}


