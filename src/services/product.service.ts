import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    // You could replace this with an HTTP request to a server that returns a list of products
    const products: Product[] = [
      { name: 'Product 1', price: 10.99, quantity: 50 },
      { name: 'Product 2', price: 24.99, quantity: 25 },
      { name: 'Product 3', price: 14.99, quantity: 100 }
    ];
    return new Observable<Product[]>(subscriber => {
      subscriber.next(products);
      subscriber.complete();
    });
  }
}

interface Product {
  name: string;
  price: number;
  quantity: number;
}
