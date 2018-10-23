import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse, HttpHandler, HttpRequest, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ProductInst } from '../model/product_inst';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
@Injectable()
export class AddCartService{
    constructor(private http: HttpClient) { }
    model: any = {};
    users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    createLocalStorage(productInst: ProductInst)
    {

       // alert("add cart service page");


        return this.http.post('/api/users', productInst);

        // let newUser=productInst;

        // // validation

        // // save new user
        // newUser.id = this.users.length + 1;

        // this.users.push(newUser);
        // localStorage.setItem('cart', JSON.stringify(this.users));

        // // respond 200 OK
        // return Observable.of(new HttpResponse({ status: 200 }));






        //users.push(product);



 
//        localStorage.setItem('users', JSON.stringify(product));

      //  return this.http.post('/api/users', productInst);

    }


    deleteLocalStorage(productId: number)
    {

        //alert("delete cart service page");


        return this.http.delete('/api/users/' + productId);
    }
    getContent(productId:number)
    {

        console.log("get content servie");
        const req = new HttpRequest('GET', '/api/product/getContentType/'+ productId , {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);


    }






}