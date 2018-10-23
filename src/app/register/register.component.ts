import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpResponse  } from '@angular/common/http';
import { AuthenticationService} from '../service/authentication.service';
import { AlertService} from '../service/alert.service';

import { UserService } from '../service/user.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']

})

export class RegisterComponent {
    model: any = {};
    loading = false;
    returnUrl: string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService){}
        ngOnInit() {
            // reset login status
            this.authenticationService.logout();
    
            // get return url from route parameters or default to '/'
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        }
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                if (data.type == 4) {
                        //alert('success');
                        if(data instanceof HttpResponse){
                          console.log('result==='+data.body);    
  
                          if(data.body=="success")
                          {
                            console.log('result==='+data.body);    
                              this.alertService.success('Registration successful', true);
                             this.router.navigate(['login']);
                             // this.router.navigate([this.returnUrl]);
                          }
                          else{
                            console.log('result==='+data.body);    
                            this.alertService.error(false);
                            this.loading = false;
                          }
                        }
                    
                    }
                  },
                  error => {
                     // this.alertService.error(error);
                      this.loading = false;
                  }
            );
        
    }
}
