import { Component, OnInit } from '@angular/core';
import { Nullable } from 'primeng/ts-helpers';
import { ProjectService } from './project.service';

export interface Project {
  id: number | null
  project: string
  title: string
  description: string
  image: File | null
}
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  ngOnInit(): void {
    this.getProjects()

  }
  constructor(private service: ProjectService) { }
  items: Project[] = []
  item: Project = {
    id: null,
    project: "",
    title: "",
    description: "",
    image: null
  }
  editItem: Project | Nullable = null;
  message: string | undefined;
  error: string | undefined;
  isPopupVisible: boolean = false;


  filtered: any = [];
  filter: string = "";
  filterData(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value;
    console.log('Filter value:', filterValue);
    this.filter = filterValue.toLowerCase()
    console.log(this.items.filter(i => i.title.toLowerCase().includes(this.filter)))
    this.filtered = this.items.filter(i => i.title.toLowerCase().includes(this.filter))
    // Perform filtering logic here
  }
  openPopup(item: any) {
    this.isPopupVisible = true;
    if (item && item.id != 0) {
      this.item = item;

    }


  }
  closePopup() {
    this.isPopupVisible = false;
    this.editItem = null;
    this.item = {
      id: null,
      project: "",
      title: "",
      description: "",
      image: null
    };
    this.getProjects()
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.item.image = file;
    console.log(file)
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
    this.service.delete(id).subscribe({
      next:(res)=>{
       
        this.getProjects()
        setTimeout(()=>{
      
          this.isDeleteDialogOpen = false;  // Close the dialog
          
        },1000)
      }
    })

  }
  getProjects() {
    this.service.get().subscribe({
      next: (event: any) => {
        console.log(event)
        this.items = event.data
      },
      error: (err: any) => {
        this.error = `Error: ${err.message}`;
        setTimeout(() => {
          this.error = undefined;
        }, 10000);
      }
    });

  }
  saveProject() {
    this.service.save(this.item).subscribe({
      next: (response) => {
        this.message = "Data saved succesfuly";

        setTimeout(()=>{
          this.message = "";

          this.closePopup()
        },1000)

      },
      error: (err) => {
        this.error = err
      }
    })
  }
}



