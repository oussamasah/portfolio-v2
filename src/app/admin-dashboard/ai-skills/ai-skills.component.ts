import { Component, OnInit } from '@angular/core';
import { Nullable } from 'primeng/ts-helpers';
import { ProjectService } from '../project/project.service';
import { AiSkillsServiceService } from './ai-skills-service.service';

interface Kills{
  id:number|null,
  skill:string,
  active:boolean,
  checked:boolean,
  multiword:boolean,
  lang:string
}
@Component({
  selector: 'app-ai-skills',
  templateUrl: './ai-skills.component.html',
  styleUrl: './ai-skills.component.css'
})
export class AiSkillsComponent implements OnInit {
  ngOnInit(): void {
    this.getProjects()

  }
  constructor(private service: AiSkillsServiceService) { }
  items: Kills[] = []
  item: Kills = {
    id: 0,
    skill:"",
    active:true,
    checked:true,
    multiword:false,
    lang:"en"
  }
  editItem: Kills | Nullable = null;
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
    console.log(this.items.filter(i => i.skill.toLowerCase().includes(this.filter)))
    this.filtered = this.items.filter(i => i.skill.toLowerCase().includes(this.filter))
    // Perform filtering logic here
  }
  openPopup(item: any) {
    this.isPopupVisible = true;
    if (item && item.id != 0) {
      this.item = item;

    }


  }
changeSelect(e:any){
  this.item.lang = e.target.value
}
  closePopup() {
    this.isPopupVisible = false;
    this.editItem = null;
    this.item =  {
      id: 0,
      skill:"",
      active:true,
      checked:true,
      multiword:false,
      lang:"en"
    };
    this.getProjects()
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



