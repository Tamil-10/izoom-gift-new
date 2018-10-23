import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from '../service/product.service';
import { ProductInst } from '../model/product_inst';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  providers: [ProductService, ProductInst]
})
export class MyOrdersComponent implements OnInit {
  userId: string;
  cookieValue = 'UNKNOWN';
  orderList:any;
  
  constructor(private cookieService: CookieService,
    private productService: ProductService, 
    private product:ProductInst) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('LoggedUser');
    this.userId = this.cookieService.get('userId');
    this.retrieveOrders();
  }

  
  retrieveOrders() {
   
      this.productService.retrieveOrders(this.userId).subscribe(data => {
        if (data instanceof HttpResponse ) {
          console.log('sdf---'+data.body);
          this.orderList = JSON.parse('' + data.body);
        }
      });
      
      
    }
}
