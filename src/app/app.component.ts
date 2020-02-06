import { Component } from '@angular/core';
import { ContactsService } from './Contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ContactsService]
})
export class AppComponent {
  title = 'task';
}
