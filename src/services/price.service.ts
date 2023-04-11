import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private baseUrl = 'http://localhost:4000/api/prices';

  constructor(private http: HttpClient) { }

  getPrices() {
    return this.http.get(`${this.baseUrl}`);
  }
}
