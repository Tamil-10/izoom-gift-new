import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse  } from '@angular/common/http';


import { CookieService } from 'ngx-cookie-service';
import { Address } from '../../model/address';
import { AddressService } from '../../service/address.service';
@Component({
  selector: 'app-editshipping',
  templateUrl: './editshipping.component.html',
  styleUrls: ['./editshipping.component.css'],
  providers: [Address, AddressService]
})
export class EditshippingComponent implements OnInit {
  model: any = {};
  userId:number;
  cookieValue = 'UNKNOWN';
  

  constructor(   private router: Router, 
     private cookieService: CookieService,
    private address:Address,
    private addressService: AddressService) { }

  ngOnInit() {
    this.userId = Number(this.cookieService.get('userId'));
  
    this.cookieValue = this.cookieService.get('LoggedUser');
  }

  createAddress() {
    this.addressService.createAddress(this.model).subscribe(data => {
      
      console.log(data);
      if (data.type == 4) {
        //alert('success');
        if(data instanceof HttpResponse){
          console.log('result==='+data.body);    

          if(data.body=="success")
          {
            console.log('result==='+data.body);    
            
             this.router.navigate(['shippingaddress']);
             // this.router.navigate([this.returnUrl]);
          }
          else{
            console.log('result==='+data.body);    
           //alert('failed');
          }
        }
    
    }
      });
    }

}
