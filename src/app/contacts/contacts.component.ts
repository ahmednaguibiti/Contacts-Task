import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactsService } from '../Contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts = [];
  newContact = [];
  searchedContacts = [];
  searchResult = [];
  characters= [];
  

  constructor(private contactService: ContactsService ) {
    let charA = 'a'.charCodeAt(0);
    let charZ = 'z'.charCodeAt(0);
    for (let i = charA; i <= charZ; i++) {
      this.characters.push(String.fromCharCode(i));
    }
  }

  ngOnInit() {
    this.contactService.getRecentContacts().subscribe(res =>{
      this.contacts = res['data'];
      this.searchedContacts = res['data'];

      if(this.contactService.getNewContacts()){
        this.contacts.push(this.contactService.getNewContacts());
      }
      this.contacts.sort( (a, b) => {
        if (a.firstName > b.firstName) return 1;
        if (a.firstName < b.firstName) return -1;
        return 0;
      })
      for(let i=0; i< this.contacts.length; i++){
        if(this.newContact.hasOwnProperty(this.contacts[i].firstName[0])){
          this.newContact[this.contacts[i].firstName[0]].push(this.contacts[i]);
        }else{
          this.newContact[this.contacts[i].firstName[0]] = [this.contacts[i]];
        }
      }
      this.contacts = Object.entries(this.newContact);
    });
    
  }

  searchContact(event){
    this.searchResult = this.searchedContacts.filter( (contact) => {
      contact.fullName = contact.firstName + " " + contact.lastName 
      return contact.fullName.toLowerCase().startsWith(event.target.value.toLowerCase());
    })
    this.searchResult.sort( (a, b) => {
      if (a.firstName > b.firstName) return 1;
      if (a.firstName < b.firstName) return -1;
      return 0;
    })
    this.newContact = [];
    for(let i=0; i< this.searchResult.length; i++){
      if(this.newContact.hasOwnProperty(this.searchResult[i].firstName[0])){
        this.newContact[this.searchResult[i].firstName[0]].push(this.searchResult[i]);
      }else{
        this.newContact[this.searchResult[i].firstName[0]] = [this.searchResult[i]];
      }
    }
    this.contacts = Object.entries(this.newContact)
  }
}
