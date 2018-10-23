import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { Product } from '../model/product';
import { ProductInst} from '../model/product_inst';
import { SearchCriteria } from '../model/searchcriteria';
import { CartComponent } from '../product/cart/cart.component';
import { User } from '../model/user';


@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }
    cartSubject = new Subject();
     public cartListSubject = new BehaviorSubject([]);

    productConfiguration(product: Product): Observable<HttpEvent<{}>> {
        let formData = new FormData();
        formData.append('type', product.type);
        //alert("type------"+product.type);
        formData.append('gender_type', product.gender_type);
        formData.append('name', product.name);
        formData.append('price', '' + product.price);
        formData.append('available_quantity', '' + product.available_quantity);
        formData.append('description', product.description);
        formData.append('file', product.file);
        formData.append('status', product.status);
        const req = new HttpRequest('POST', '/api/product/productConfiguration', formData, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }


    retrieveProductList(searchCriteria : SearchCriteria): Observable<HttpEvent<{}>> {
        
        const req = new HttpRequest('POST', '/api/product/retrieveProductList', searchCriteria, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
        
    }
    retrieveProductsByFilter(filterId: string) {
        console.log('dkn----'+filterId);
        const req = new HttpRequest('GET', '/api/product/retrieveProductsByFilter/' + filterId, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    deleteProduct(input: any): Observable<HttpEvent<{}>> {
        const req = new HttpRequest('DELETE', '/api/product/deleteProduct', input, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    addProductInst(input: any) {
        const req = new HttpRequest('POST', '/api/productinst/addProduct', input, {
            reportProgress: true,
            responseType: 'text'
        });
        
        return this.http.request(req);
      
       //this.cartSubject.next(<CartComponent>{ loaded: true, products: this.Products });
    }

    getCartCount(userId: string) {
        const req = new HttpRequest('GET', '/api/productinst/getCartCount/' + userId, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    getOrderSummary(userId: string) {
        const req = new HttpRequest('GET', '/api/productinst/getOrderSummary/' + userId, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }
    reloadCart = (orderList) => {
        this.cartListSubject.next(orderList);
    };
    updateCart(product_id:any, quantity : any, userId): Observable<HttpEvent<{}>> {
        console.log('dn-----'+product_id+'sad----'+quantity+'dsfjk====='+userId);
        const req = new HttpRequest('POST', '/api/productinst/updateCart/' + product_id + '/' + quantity + '/' + userId, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
        //this.cartSubject.next(<CartComponent>{ loaded: true, products: this.Products });
    }      
    deleteCartItem(product_id:any,userId): Observable<HttpEvent<{}>>{
        console.log('dn-----'+product_id);
        const req = new HttpRequest('POST', '/api/productinst/deleteCartItem/' + product_id + '/' + userId , {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }
    updateProductInst(input: any) {
        const req = new HttpRequest('POST', '/api/productinst/updateProduct', input, {
            reportProgress: true,
            responseType: 'text'
        });
        
        return this.http.request(req);
      
       //this.cartSubject.next(<CartComponent>{ loaded: true, products: this.Products });
    }
    
    retrieveOrders(userId:string): Observable<HttpEvent<{}>> {
       // alert('order retrieve '+userId)
        
        const req = new HttpRequest('GET', '/api/productinst/retrieveOrders/' + userId, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
        
    }
  
   
}