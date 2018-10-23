import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../service/product.service';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CartComponent } from '../../product/cart/cart.component';
import { CartBaseComponent } from '../../product/ordersummary/cart-base.component';
import { AddressService } from '../../service/address.service';
import { CookieService } from 'ngx-cookie-service';
import { Address } from '../../model/address';
import {ProductInst } from '../../model/product_inst';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
  providers: [ProductService, CartComponent, Address, AddressService, ProductInst]
  
})


export class ReceiptComponent extends CartBaseComponent implements OnInit {
  today: number = Date.now();
  userId: string;
  orderList: any;
  orderId:any;
  total = 0;
   addressList: Array<Address>;
  constructor(protected productService: ProductService,
     private cartComponent: CartComponent,  
     private addressService: AddressService,
     private address:Address,
     private activatedRoute: ActivatedRoute, 
      private cookieService: CookieService) {
    super(productService);
    this.userId = this.cookieService.get('userId');
    console.log('userid'+this.userId);
   }

  ngOnInit() {
    this.retrieveShippingAddress();
    this.getOrderSummary();  
    this.activatedRoute.queryParams.subscribe(params => {    
      this.orderId = params['order'];
      console.log('params'+this.orderId);
    });
      
  }

  getOrderSummary() {
    this.productService.getOrderSummary(this.userId).subscribe(data => {
      if (data instanceof HttpResponse ) {
        //console.log(data.body);
        this.orderList = JSON.parse('' + data.body);
        //console.log(this.orderList);
        this.totalPrice = 0;
        // this.orderList.forEach(element => {
        //   console.log(element);
        //   this.totalPrice = this.total + element.price * element.quantity;
        // });
        for(let product of this.orderList) {
          this.totalPrice += product.price * product.quantity;
          
      }
      }
    });
  }
  
  retrieveShippingAddress() {
    this.addressService.retrieveShippingAddress(this.userId).subscribe(data => {          
      console.log(data);
    
      if (data instanceof HttpResponse ) {
        console.log(data.body);
        
        this.addressList = JSON.parse('' + data.body).filter((item) => item.id == this.orderId);
        console.log('order'+this.addressList);
        
        
      }
    });
     
  }
  confirmOrder(){
    let productInst = new ProductInst();
    //productInst.address_id=address.id;
  productInst.status='Ordered';
   productInst.user_id = Number(this.userId);
  productInst.address_id=this.orderId;
    this.productService.updateProductInst(productInst).subscribe(data => {
      console.log(data);
      if (data.type == 4) {
 
      }

    });
    this.productService.cartSubject.next(true);
    
  }
}
