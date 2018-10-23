import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cartCount:number;
  refreshShoppingCart(){
    this.cartCount=10;
    console.log('refreshShoppingCart');
  }
}
