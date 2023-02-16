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
      { name: 'Coconut Burfi', price: 600, image:'./assets/coco9.jpg'},
      { name: 'Coconut Oil', price: 500, image:'./assets/card2.jpg' },
      { name: 'Coconut Syrup', price: 300, image:'./assets/coco7.jpg' },
      { name: 'Coconut Water', price: 400, image:'./assets/card4.jpg' },
      { name: 'Coconut Goods', price: 590, image:'./assets/card5.jpg' },
      { name: 'Coconut Plam Sugar', price: 595, image:'./assets/coco8.jpg' }
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
  image: string;
}
