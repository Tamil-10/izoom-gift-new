import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  // add readonly property to filter maxPrice must greater than minPrice
  public get maxPriceOptions(): any[] { 
    return this.priceMinFilter ?  this._priceOptions.filter(p => p.productPrice > this.priceMinFilter) : this._priceOptions;
  }

  // Initializing Properties
  priceMinFilter: number = 0;
  priceMaxFilter: number = 0;
  priceFilterForm: FormGroup;



  // Outputs
  @Output() filterPrice: EventEmitter<IProductPriceLimit> = new EventEmitter<IProductPriceLimit>();
    
     amounts = ["Below 100", "100 - 200", "200 - 300", "300 - 1000" ];
  selectedPrice: "Below 500";
  // Constructor
  constructor() {
    this.priceFilterForm = new FormGroup({
      priceMin: new FormControl(""),
      priceMax: new FormControl("")
    });
  }
 

  onPriceMaxChange() {
   //console.log(arguments); 
  }
  // From Actions
  onSubmit() {
    this.filterPrice.emit({
      priceMin: this.priceMinFilter || null,
      priceMax: this.priceMaxFilter || null
    });
  }
    public getCurrency(): string {
    return 'Rs.';
  }
  // Data
  _priceOptions = [
    { "productPrice": 100 },
    { "productPrice": 200 },
    { "productPrice": 300 },
    { "productPrice": 400 },
    { "productPrice": 500 },
    { "productPrice": 600 },
    { "productPrice": 700 },
    { "productPrice": 800 },
    { "productPrice": 900 },
    { "productPrice": 1000 },
    { "productPrice": 50000 },
    { "productPrice": 60000 },
    { "productPrice": 70000 },
    { "productPrice": 80000 },
    { "productPrice": 90000 },
    { "productPrice": 100000 },
    { "productPrice": 150000 },
    { "productPrice": 200000 },
    { "productPrice": 300000 },
    { "productPrice": 400000 },
    { "productPrice": 500000 },
    { "productPrice": 1000000 },
  ]
}

interface IPriceOptions {
  productPrice: string;
}