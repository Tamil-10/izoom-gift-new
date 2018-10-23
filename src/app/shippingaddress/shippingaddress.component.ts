import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpResponse, HttpRequest, HttpClient, HttpParams } from '@angular/common/http';
import { Address } from '../model/address';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrls: ['./shippingaddress.component.css'],
  providers: [Address, AddressService]
})
export class ShippingaddressComponent implements OnInit {
  userId: string;
  cookieValue = 'UNKNOWN';
  private orderList: Array<Address> = [];
 
  constructor(private router: Router, 
    private cookieService: CookieService,
   private address:Address,
   private addressService: AddressService) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('LoggedUser');
    this.userId = this.cookieService.get('userId');
    
    this.retrieveShippingAddress();
  }

 

  retrieveShippingAddress() {
    this.addressService.retrieveShippingAddress(this.userId).subscribe(data => {          
      console.log(data);
    
      if (data instanceof HttpResponse ) {
        console.log(data.body);
        
        this.orderList = JSON.parse('' + data.body);
        if(this.orderList.length < 1){
          this.router.navigate(['/editshipping']);
        }
        
      }
    });
     
  }
  removeAddress(index){ 
    console.log('sd----------'+index);
    console.log('sd----------'+this.orderList[index].id);  
    this.addressService.deleteAddress(this.orderList[index].id).subscribe(data =>{
      
      if (data.type == 4) { 
        
        
     console.log('success');
          }
 
  });   
  this.orderList.splice(index, 1);               
  } 

}
