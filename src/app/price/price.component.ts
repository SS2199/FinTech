import { Component } from '@angular/core';
import { PriceService } from '../../services/price.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent {
  prices: any;
  displayedPrices: any;

  constructor(private priceService: PriceService) { }

  ngOnInit() {
    this.priceService.getPrices().subscribe((price: any) => {
      this.prices = price;
      this.displayedPrices = this.prices.slice(0, 10); // Assign initial 10 rows to 'displayedPrices' array
      console.log(this.prices);
    });
  }

  loadMore() {
    // Load more data from 'prices' array and append to 'displayedPrices' array
    this.displayedPrices = this.displayedPrices.concat(this.prices.slice(this.displayedPrices.length, this.displayedPrices.length + 20));
  }
}
