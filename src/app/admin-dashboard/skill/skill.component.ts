import { Component, OnInit } from '@angular/core';
import { SkillService } from './skill.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nullable } from 'primeng/ts-helpers';
export enum Categ {
  backend = "backend",
  frontend = "frontend",
  database = "database",
  version = "Controll Version",
  crm = "Methodology & Project Manager",
  language = "language",
  other = "others"
}
export interface skill {
  id: number | null
  name: string
  category: string
  icon: File | null
}
@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent implements OnInit {
  categories = Object.keys(Categ).map(key => ({ key, value: Categ[key as keyof typeof Categ] }));

  item: skill = {
    id: null,
    name: '',
    category: "",
    icon: null
  };
  filtered: any = [];
  filter: string = "";
  items: skill[] = []
  editItem: skill | Nullable = null;
  message: string | undefined;
  error: string | undefined;
  isPopupVisible: boolean = false;
  constructor(private service: SkillService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.getAll()
  }
  changeSelect(e: any) {
    this.item.category = e.target.value
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
      category: "",
      icon: null
    };
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.item.icon = file;
  }


  saveSkill() {
    if (this.item.name.length > 0 && this.item.category.length > 0) {


      console.log(this.item)
      this.service.saveSkill(this.item).subscribe({
        next: (res) => {
          this.message = "Skill saved successfuly"
          this.getAll()
          setTimeout(() => {
            this.message = undefined;
            this.closePopup()
          }, 2000);

        },
        error: (err) => {
          this.error = "Skill not saved"
          setTimeout(() => {
            this.error = undefined;
          }, 2000);
        }
      })
    } else {
      console.log(this.item.name.length)
      console.log(this.item.category.length)
      console.log(this.item?.icon)
      this.error = "Verify your data"
      setTimeout(() => {
        this.error = undefined;
      }, 1000);
    }
  }
  getAll() {
    this.service.getSkills().subscribe({
      next: (data: any) => {
        this.items = data
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
    this.service.deleteSkill(id).subscribe({
      next: (data) => {
        this.message = "Skill successfuly deleted"
        this.getAll()
        this.isDeleteDialogOpen = false;
      }
    })
  }
}
