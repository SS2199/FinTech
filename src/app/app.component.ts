import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>CRUD Operations with Fetch</h1>
    <form (submit)="addMessage()">
      <input [(ngModel)]="newMessage" placeholder="Enter a message" />
      <button type="submit">Add Message</button>
    </form>
    <ul>
      <li *ngFor="let message of messages">
        {{ message.text }}
        <button (click)="deleteMessage(message.id)">Delete</button>
      </li>
    </ul>
  `,
})
export class AppComponent implements OnInit {
  messages: any[] = [];
  newMessage = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.dataService.fetchItems().subscribe((data) => {
      this.messages = data.messages;
    });
  }

  addMessage() {
    const newMessage = { text: this.newMessage };
    this.dataService.addItem(newMessage).subscribe(() => {
      this.newMessage = '';
      this.loadMessages();
    });
  }

  deleteMessage(id: string) {
    this.dataService.deleteItem(id).subscribe(() => {
      this.loadMessages();
    });
  }
}
