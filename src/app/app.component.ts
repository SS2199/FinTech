import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  items: any[] = [];
  newItem = { name: '', price: 0 };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.apiService.getItems().subscribe((data) => (this.items = data));
  }

  addItem() {
    this.apiService.addItem(this.newItem).subscribe((item) => {
      this.items.push(item);
      this.newItem = { name: '', price: 0 };
    });
  }
}
