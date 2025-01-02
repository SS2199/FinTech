import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Base API URL (relative to the app's base URL)
  private apiUrl = '/api'; // Use relative URL for flexibility

  constructor(private http: HttpClient) {}

  // GET: Fetch all items
  fetchItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/items`, {
      headers: this.getHeaders(),
    });
  }

  // POST: Add a new item
  addItem(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-item`, item, {
      headers: this.getHeaders(),
    });
  }

  // DELETE: Delete an item
  deleteItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-item/${itemId}`, {
      headers: this.getHeaders(),
    });
  }

  // PUT: Update an item
  updateItem(itemId: string, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-item/${itemId}`, item, {
      headers: this.getHeaders(),
    });
  }

  // Helper method to set headers
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
