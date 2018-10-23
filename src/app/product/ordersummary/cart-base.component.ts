// /**
//  * Created by Andrew on 7/30/2017.

import { Output, EventEmitter, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import { Product } from '../../model/product';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
export class CartBaseComponent implements OnInit{
    public orderList:any;
    public totalPrice: number;
    @Output() refreshShoppingCart = new EventEmitter();
    constructor(protected productService: ProductService) {
        this.loadCart();
    }
    
  ngOnInit() {
 
  }

    loadCart = () => {
        this.productService.cartListSubject
            .subscribe(res => {
                this.orderList = res;
                let total =  0;
                for(let product of this.orderList) {
                    total += product.price * product.quantity;
                    
                }
                this.totalPrice = total;
            })
            this.productService.cartSubject.next(true);
    };
    // removeFromCart = index => {       
    //     this.productService.removeCart(index);
    //     console.log('dsfjnv---'+index);
    // };
      
}