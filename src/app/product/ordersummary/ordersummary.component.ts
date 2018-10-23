import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CartBaseComponent } from './cart-base.component';
import { ProductInst } from '../../model/product_inst';
import { CartComponent } from '../cart/cart.component';
import { CookieService } from 'ngx-cookie-service';
import { AddCartService } from '../../service/add-cart.service';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css'],
  providers: [ProductService, ProductInst, CartComponent]
})
export class OrdersummaryComponent extends CartBaseComponent implements OnInit {
  userId: string;
  product_id:any;
  userName: string;
  successMsg: string;
  
  orderList: any;
  contentList:any;
  imgdatapreffix = "data:";
  imgdatasuffix = ";base64,";
  total = 0;
  cookieValue = 'UNKNOWN';
  totalPrice:number = 0;
  @Output() refreshShoppingCart = new EventEmitter();
  constructor(private product:ProductInst, protected productService: ProductService,private addCartService: AddCartService, private cartComponent: CartComponent,  private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService) {    
    super(productService);
  
  }

  ngOnInit() {
    this.userName = 'pandian'
    this.userId = this.cookieService.get('userId');
    
    this.cookieValue = this.cookieService.get('LoggedUser');
  
    this.getOrderSummary();    
    
  }







  getOrderSummary() {
  
  if(this.cookieValue=='UNKNOWN'||this.cookieValue==''||this.cookieValue==null)
  {

    
  
    if("cart" in localStorage){ 
      this.orderList= JSON.parse(localStorage.getItem('cart'));
      this.totalPrice = 0;
      for(let product of this.orderList) {               
        this.totalPrice += product.price * product.quantity;
        
    }
    }
     else{  
console.log('no');
     }
  
  }

  
  else
  {
  
  
    this.productService.getOrderSummary(this.userId).subscribe(data => {
      if (data instanceof HttpResponse ) {
        //console.log(data.body);
        this.orderList = JSON.parse('' + data.body);
        //console.log(this.orderList);
        
        this.totalPrice = 0;
        // this.orderList.forEach(element => {
        //   console.log("element---"+element);
        //   this.totalPrice = element.price * element.quantity;
        // });
        for(let product of this.orderList) {
          this.totalPrice += product.price * product.quantity;
          
      }
      }
    });
  }
  }







//   changeQuantity = (product,quantity) => {
//     product.quantity = quantity;
//     this.productService.reloadCart(this.orderList);
// }
changeQuantity = (product,quantity) => {
  if(this.cookieValue=='UNKNOWN'||this.cookieValue=='')
  {
 
    let productInst = new ProductInst();
   // alert('quantity+'+quantity);
    productInst.quantity = quantity;
    productInst.price = product.price;
    productInst.product_id = product.product_id;
    productInst.user_id = Number(this.userId);
    productInst.created_by = this.userName;
    productInst.status = 'Draft';
    productInst.content=product.content;
    productInst.content_type=product.content_type;
    console.log(productInst);


    this.addCartService.createLocalStorage(productInst)
    .subscribe(
        data => {

          //alert("returned back");

            // this.alertService.success('Registration successful', true);
            // this.router.navigate(['login']);
        },
        error => {

         // alert("error occured");
            // this.alertService.error(error);
            // this.loading = false;
        });
        this.getOrderSummary();  
        this.productService.cartSubject.next(true);

  }
  else{
     product.quantity = quantity;   
     this.productService.reloadCart(this.orderList);
     console.log("--gfh--"+quantity);
     console.log("-sd----"+product.quantity);
     console.log('ks--sa---'+product.product_id);
     console.log('userId'+this.userId);
      this.productService.updateCart(product.product_id,quantity,this.userId).subscribe(k =>{
        if (k.type == 4) {
          console.log('reload cart');
          
          
        }
      });
      
      this.productService.cartSubject.next(true);
  // this.getOrderSummary();     
    }
}


removeFromCart(index){ 
  if(this.cookieValue=='UNKNOWN'||this.cookieValue=='')
  { console.log('sd----------'+index);
  console.log('sd----------'+this.orderList[index].product_id);  
  this.addCartService.deleteLocalStorage(this.orderList[index].product_id)
  .subscribe(
      data => {
        
        

          // this.alertService.success('Registration successful', true);
          // this.router.navigate(['login']);
      },
      error => {
        
        
          // this.alertService.error(error);
          // this.loading = false;
      });
      this.orderList.splice(index, 1);   
      this.getOrderSummary();  
      this.productService.cartSubject.next(true);

  }
else{
  console.log('sd----------'+index);
  console.log('sd----------'+this.orderList[index].product_id);  
  console.log('userId'+this.userId);
  this.productService.deleteCartItem(this.orderList[index].product_id, this.userId).subscribe(k =>{
    if (k.type == 4) { 
      console.log('item deleted');
      this.productService.cartSubject.next(true);
    }
  });
 this.orderList.splice(index, 1);   
                
} 
}
  proceedToPayment() {
    this.router.navigateByUrl('paymentgatway')
  }

}
