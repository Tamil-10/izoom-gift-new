import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpResponse  } from '@angular/common/http';
import { AlertService } from '../service/alert.service';
import { AuthenticationService} from '../service/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/user.service';
import { Admin } from '../model/admin';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [Admin]
})
export class AdminComponent implements OnInit {
  model: any = {};
  loading = false;
  cookieValue = 'UNKNOWN';
  userId : string;
  returnUrl: string;
  socialUser='UNKNOWN';
  constructor(
    private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private cookieService: CookieService,
        private admin:Admin,
        private userService: UserService
  ) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.authenticationService.adminLogin(this.model.username, this.model.password)
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
                        this.admin = JSON.parse('' + data.body);
                        console.log('userId'+this.admin.id);
                        console.log('userName'+this.admin.email);
                      //  this.cookieService.set( 'LoggedUser', this.admin.email );     
                        this.userId = String(this.admin.id); 
                        console.log('userIddddddddddddddd'+this.userId);
                     //   this.cookieService.set('userId', this.userId);
                        this.userId =  this.cookieService.get('userId');
                        console.log(this.userId);
                      
                     //   this.cookieValue = this.cookieService.get('LoggedUser');

                       
                        this.router.navigate(['add-post']);
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
