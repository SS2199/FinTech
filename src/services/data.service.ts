import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000'; // Replace with your backend URL

  // GET: Fetch all items
  fetchItems(): Observable<any> {
    return from(
      fetch(`${this.apiUrl}/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
    );
  }

  // POST: Add a new item
  addItem(item: any): Observable<any> {
    return from(
      fetch(`${this.apiUrl}/add-item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      }).then((response) => response.json())
    );
  }

  // DELETE: Delete an item
  deleteItem(itemId: string): Observable<any> {
    return from(
      fetch(`${this.apiUrl}/delete-item/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
    );
  }

  // PUT: Update an item
  updateItem(itemId: string, item: any): Observable<any> {
    return from(
      fetch(`${this.apiUrl}/update-item/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      }).then((response) => response.json())
    );
  }
}
