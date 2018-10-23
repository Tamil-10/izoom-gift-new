import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class AddPostService {
    constructor(private http: HttpClient) { }


    userList():Observable<HttpEvent<{}>>
    {


        console.log('User service page');

        const req = new HttpRequest('POST', '/api/admin/userList',  {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);

    }

    addPost(youtube: string, userid: number)
    {
        let formData = new FormData();
        formData.append('youtube', youtube);

        formData.append('user', '' + userid);
        const req = new HttpRequest('POST', '/api/admin/addPost', formData , {
            reportProgress: true,
            responseType: 'text'
        });

    }




}