import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-carosal',
  templateUrl: './carosal.component.html',
  styleUrls: ['./carosal.component.scss']
})
export class CarosalComponent {

 products!: any[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

}
