import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts = [];
  newContact = {};
  searchedContacts = [];

  constructor(private httpClient: HttpClient) { }

  getRecentContacts(){
    return this.httpClient.get("assets/recent-contact.json");
  }

  addNewContact(firstName, lastName, code, phone, email){
    this.newContact =  {firstName, lastName, code, phone, email};
  }

  getNewContacts(){
    if(Object.entries(this.newContact).length != 0){
      console.log("test", this.newContact);
      return this.newContact;
    }
  }
}
