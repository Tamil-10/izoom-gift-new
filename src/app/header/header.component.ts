import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  socialUser= 'UNKNOWN';
  isCollapsed = false;
  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('LoggedUser');
    this.socialUser = this.cookieService.get('socialUser');

   
    if(this.cookieValue=='')
    {
      this.cookieValue = 'UNKNOWN';
    }
    if(this.socialUser=='')
    {
      this.socialUser = 'UNKNOWN';
    }
  }

}
