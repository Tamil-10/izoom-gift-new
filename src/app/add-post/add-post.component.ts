import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpResponse  } from '@angular/common/http';
import { AlertService } from '../service/alert.service';
import { AddPostService} from '../service/add-post.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Admin } from '../model/admin';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [User]
})
export class AddPostComponent implements OnInit {
  model: any = {};
  loading = false;
  cookieValue = 'UNKNOWN';
  userId : string;
  returnUrl: string;
  socialUser='UNKNOWN';
  userList:any={};
  constructor(
    
    private route: ActivatedRoute,
        private router: Router,
        private addpostservice: AddPostService,
        private alertService: AlertService,
        private cookieService: CookieService,
        private userService: UserService,
        private user:User
  ) { }

  ngOnInit() {
this.userlist();
    
  }


  userlist() {

    this.addpostservice.userList().subscribe(data => {
      
      if (data instanceof HttpResponse ) {
        console.log("15414"+data.body);
        this.userList=data.body;
        //this.userList= JSON.parse('' + data.body);

        
        console.log('ssssdsc------'+this.userList);
        
      }
    });

}


addPost()
{

console.log("selected value"+this.model.youtube);

// this.addpostservice.addPost(this.model.youtube, this.model.userid)
// .subscribe(
//     data => {
//   },
//     error => {
//         this.alertService.loginerror();
//         this.loading = false;
//     });

  
}


}
