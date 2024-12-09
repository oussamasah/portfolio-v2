import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environment';
import { TestimonialService } from './testimonial.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent implements OnInit {
constructor(private testimonialService:TestimonialService) {
  
}
ngOnInit(): void {
 this. getAll()
}
  path: string = environment.apiUrl.replace(/\/+$/, '');
    items:any=[]
    getAll(){
      this.testimonialService.get().subscribe({
        next:(res)=>{
          this.items = res;
        }
      })
    }
    updateState(id:number,state:boolean){
      let changedState = state == true ? false : true;
this.testimonialService.changeState(id,changedState.toString()).subscribe({
  next:(res)=>{
    this. getAll()
  },
  error:(err)=>{
    this. getAll()

  }
})
    }
}
