import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Nullable } from 'primeng/ts-helpers';
interface contacts {
  id: string,
  name: string,
  email: string,
  number: string,
  message: string,
  createdDate: Date,
  seen: boolean,
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contacts: contacts[] = [
    {
      id: "string",
      name: "string",
      email: "string",
      number: "string",
      message: "string",
      createdDate: new Date(),
      seen: false,
    }
  ];
  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.getContact()
  }


  isPopupVisible = false;
  editItem: contacts | Nullable = null;
  openPopup(item: any) {
    this.isPopupVisible = true;
    this.editItem = item;
    this.seenContact()

  }

  closePopup() {
    this.isPopupVisible = false;
    this.editItem = null;
  }

  getContact() {
    this.contactService.getContacts().subscribe({
      next: (res: any) => {
        this.contacts = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  seenContact() {
    this.contactService.seen(this.editItem?.id).subscribe({
      next: (res: any) => {
        this.getContact()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
