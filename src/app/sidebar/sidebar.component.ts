import { Component, EventEmitter, Output } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Output() sendDataToParent = new EventEmitter<boolean>();
  isActive = true;

  toggleClass() {
    this.isActive = !this.isActive;
    this.sendDataToParent.emit( this.isActive );
  }
  goToSection(index: number): void {
    $.scrollify.move(index);  // Scroll to the section at the given index
  }
}
