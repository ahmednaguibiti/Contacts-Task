import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../Contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  firstName:string = "";
  lastName:string = "";
  code = '';
  phone = '';
  email:string = "";

  constructor(private contactService: ContactsService, private router: Router) { }

  ngOnInit() {
  }

  addNewContact(event){
    if(this.firstName != "" && this.lastName != "" && this.code != '' && this.phone != '' && this.email != ""){
      event.preventDefault();
      this.contactService.addNewContact(this.firstName, this.lastName, this.code, this.phone, this.email);
      this.router.navigate(['/contacts']);
    }else{
      alert("You Must Fill out All Fields!");
    }
    
  }

  cancel(){
    this.router.navigate(['/contacts']);
  }

}
