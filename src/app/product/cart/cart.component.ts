import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ProductService } from '../../service/product.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: []
})
export class CartComponent implements OnInit {

  cartCount: number;
  userId: string;
  orderList:any;

  constructor(private productService: ProductService, private cookieService:CookieService) {
  
    
  }

  ngOnInit() {
    this.cartCount = 0;
    this.userId = this.cookieService.get('userId');
    this.productService.cartSubject.subscribe(

      (flag: boolean) => {
        console.log('flag:' + flag);
        if (flag = true) {
          this.getCartCount();
        }
      }
    );
     this.getCartCount();
    /*setInterval(() => {
      this.getCartCount();
    }, 1000);*/    

  }

  public getCartCount() {
    if(this.userId=='1'){
      console.log('getCartCount');
       
      if("cart" in localStorage){       
        this.orderList= JSON.parse(localStorage.getItem('cart'));
        this.cartCount=0;   
      for(let product of this.orderList) {   
         
        this.cartCount += product.quantity;        
    }
      }else{
        console.log('orderList empty');
  }
    }
    else{
    console.log('getCartCount');
    this.productService.getCartCount(this.userId).subscribe(data => {
      console.log(data);
      if (data instanceof HttpResponse ) {
        console.log(data.body);
        this.cartCount = JSON.parse('' + data.body);
      }
    });
  }
  }

}
