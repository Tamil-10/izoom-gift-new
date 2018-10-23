import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpResponse  } from '@angular/common/http';
import { AlertService } from '../service/alert.service';
import {  FacebookSigninService } from '../service/facebook-signin.service';

import { AuthenticationService} from '../service/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { ProductInst } from '../model/product_inst';
import { ProductService } from './../service/product.service';

declare const FB: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls:['login.component.css'],
    providers: [User, ProductInst]
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    cookieValue = 'UNKNOWN';
    userId : string;
    returnUrl: string;
    socialUser='UNKNOWN';
    orderList:any;
    
    /**
   * The app ID of your Facebook app. Create one at https://developers.facebook.com/apps/
   */
  appID: String = '280665652573156';

  /**
   * Whether you want to set a cookie in order to allow the server to access the session.
   */
  cookie: Boolean = true;

  /**
   * The `version` attribute specifies which FB API version should be used. Example 'v2.10'.
   */
  version: String = 'v3.1';

  /**
   * The language of the sdk.
   */
  language: String = 'en_US';

  /**
   * The scope that you want access to.
   * (see https://developers.facebook.com/docs/facebook-login/permissions/v2.10). Should be space delimited.
   */
  scope: String = 'public_profile,email,user_friends';

  @Output() status = new EventEmitter<any>();








    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private fbSigininService: FacebookSigninService,
        private cookieService: CookieService,
        private user:User,
        private userService: UserService,
        private productService: ProductService

    ) { }


     //Facebook Login Functions

     openPopup() {

        const options = {
          appId: this.appID,
          cookie: this.cookie,
          xfbml: false,
          version: this.version
        }
  
        FB.init(options);
  
        FB.login(function (response) {
          // console.log('Get Login Response:: ', response);
          this._statusChangedCallback(response);
        }.bind(this), {
          scope: this.scope,
          auth_type: 'reauthenticate'
        });
    }
  
  
    _statusChangedCallback(response) {
      if (response.status === 'connected') {
        // Logged into app and Facebook.
        // console.log('connected');
        this.fbGraphApi();

      

        this.model.email=response.email;
         //Insert user details from Logged Facebook user


          this.loading = true;
          this.userService.createSocial(response.email,response.name)
              .subscribe(
                  data => {
                  if (data.type == 4) {
                          if(data instanceof HttpResponse){
                            console.log('result==='+data.body);    
    
                            if(data.body=="success")
                            {

                              
                              console.log("return success 1");
//                              this.router.navigate(['/']);

                            }
                            else{

                              
                              console.log("return failure 1");



                              var socialname=null;
                              var socialemail=null;
                              
                              socialname= (<HTMLInputElement>document.getElementById('name')).value;
                              socialemail=(<HTMLInputElement>document.getElementById('email')).value;
                     
        
        
                              // function call to userService
        
        
                                    this.loading = true;
                    this.userService.createSocialUser(socialemail,socialname)
                        .subscribe(
                            data => {
                            if (data.type == 4) {
                                    if(data instanceof HttpResponse){
              
                                      if(data.body=="success")
                                      {
                                        console.log('result==='+data.body);    
                                         
                                        // this.router.navigate(['/']);
                                         
                                      }
                                      else{
                                        console.log('result==='+data.body)  ;    
                                        
                                        //this.router.navigateByUrl('/gifts');
                                        
                                      }
                                    }
                                
                                }
                              },
                              error => {
                                console.log('error');    
                                 // this.alertService.error(error);
                                //  this.loading = false;
                              }
                        );
        
        
                        this.router.navigate(['/']);

                            }
                          }
                      
                      }
                    },
                    error => {

                      
                      console.log("error occured");

                      var socialname=null;
                      var socialemail=null;
                      
                      socialname= (<HTMLInputElement>document.getElementById('name')).value;
                      socialemail=(<HTMLInputElement>document.getElementById('email')).value;
             


                      // function call to userService


                            this.loading = true;
            this.userService.createSocialUser(socialemail,socialname)
                .subscribe(
                    data => {
                    if (data.type == 4) {
                            if(data instanceof HttpResponse){
      
                              if(data.body=="success")
                              {
                                console.log('result==='+data.body);    
                                 
                                // this.router.navigate(['/']);
                                 
                              }
                              else{
                                console.log('result==='+data.body)  ;    
                                
                                //this.router.navigateByUrl('/gifts');
                                
                              }
                            }
                        
                        }
                      },
                      error => {
                        console.log('error');    
                         // this.alertService.error(error);
                        //  this.loading = false;
                      }
                );


                this.router.navigate(['/']);







                    }
              );

        




     //  this.router.navigate(['/']);
      //  this.status.emit({ response: response });
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not into the app.
        // console.log('Not Authorized');
      //  this.status.emit({ response: response });
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        // console.log('User not signed in');
      //  this.status.emit({ response: response });
      }
    }
  
    fbGraphApi() {
      FB.api('/me', {fields: 'email,name'}, function(response) {
        if (!response || response.error) {
            console.log('Error occured');
        } else {
            
          //  this.router.navigate(['/']);
       
          (<HTMLInputElement>document.getElementById('email')).value= response.email;
          (<HTMLInputElement>document.getElementById('name')).value=response.name;





          console.log('Graph Response', response);
         // this.status.emit({ response: response });      
        }
      });
    }






    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        const script = `https://connect.facebook.net/${this.language}/sdk.js#xfbml=1&version=${this.version}&appId=${this.appID}`;
        this.fbSigininService._loadScript(script);

    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    
                  if (data.type == 4) {
                      
                      if(data instanceof HttpResponse){
                        console.log('result==='+data.body);    

                        if(data.body=='')
                        {
                         
                            //location.reload();
                            this.alertService.loginerror();
                    this.loading = false;  
                           
                        }
                        else{
                            this.user = JSON.parse('' + data.body);
                            console.log('userId'+this.user.id);
                            console.log('userName'+this.user.username);
                            this.cookieService.set( 'LoggedUser', this.user.username );     
                            this.userId = String(this.user.id); 
                            console.log('userIddddddddddddddd'+this.userId);
                            this.cookieService.set('userId', this.userId);
                            this.userId =  this.cookieService.get('userId');
                            console.log(this.userId);
                            
                            this.cookieValue = this.cookieService.get('LoggedUser');
                           
                               
                            if("cart" in localStorage){       
                              this.orderList= JSON.parse(localStorage.getItem('cart'));      
                              for(var i=0;i< this.orderList.length;i++)
                            {
                            let productInst = new ProductInst();
                            productInst.quantity = this.orderList[i].quantity;
                            productInst.price = this.orderList[i].price;
                            productInst.product_id = this.orderList[i].product_id;
                            productInst.user_id =  this.user.id;
                            productInst.created_by = 'Tamil';
                            productInst.status = 'Draft';                           
                            console.log(productInst);
                            this.productService.addProductInst(productInst).subscribe(data => {
                              console.log(data);
                              if (data.type == 4) {
                                
                                console.log('reload cart');
                               // this.productService.cartSubject.next(true);                                
                              }
                        
                            });
                          }
                            }
                            else{  
                              console.log('orderList empty') ;             
                            
                        
                      }
                          localStorage.removeItem('cart');

                           
                            this.router.navigate([this.returnUrl]);
                        }
                      

                      
                      
                        }
                    
                    }

              },
                error => {
                    this.alertService.loginerror();
                    this.loading = false;
                });
    }
}
