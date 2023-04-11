import { Component } from '@angular/core';
import { PriceService } from '../../services/price.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent {
  price: any;
  prices: any;

  constructor(private priceService: PriceService) { }

  ngOnInit() {
    this.priceService.getPrices().subscribe((price: any) => {
      this.prices = price;
      console.log(this.prices);
    });
  }
}
