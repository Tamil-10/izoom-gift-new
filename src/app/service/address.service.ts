import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';

import { Address } from '../model/address';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AddressService  {
    userId:string;
    cookieValue = 'UNKNOWN';
    constructor(private http: HttpClient,
        private cookieService: CookieService) {
            this.userId = this.cookieService.get('userId');
           // this.cookieValue = this.cookieService.get('LoggedUser');
         }

  
    createAddress(address: Address): Observable<HttpEvent<{}>> {
        let formData = new FormData();
        //alert('address----'+this.userId);
        formData.append('userId',this.userId);
        formData.append('name', address.name);
        formData.append('address', address.address);
        formData.append('contactnumber', address.contactnumber);
       // alert('addressservice -'+address.address+address.contactnumber+address.name);
        const req = new HttpRequest('POST', '/api/address/createAddress', formData, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    retrieveShippingAddress(userId: string) {
        console.log('dkn----'+userId);
        const req = new HttpRequest('GET', '/api/address/retrieveShippingAddress/' + userId, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }
    deleteAddress(id:any){
        console.log('dn-----'+id);
        const req = new HttpRequest('POST', '/api/address/deleteAddress/' + id , {
            reportProgress: true,
            // responseType: 'text'
            responseType:'text'
        }) 
        return this.http.request(req);
    }
    

}