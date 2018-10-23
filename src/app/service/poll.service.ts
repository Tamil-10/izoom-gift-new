import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Poll } from '../model/poll';

@Injectable()
export class PollService {
    constructor(private http: HttpClient) { }

    save(poll: Poll): Observable<HttpEvent<{}>> {
        const req = new HttpRequest('POST', '/api/poll/save', poll, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    retrievePoll(input: any): Observable<HttpEvent<{}>> {
        const req = new HttpRequest('GET', '/api/poll/retrievePoll/' + input, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }


    updatepoll(input: any): Observable<HttpEvent<{}>> {
        const req = new HttpRequest('POST', '/api/poll/updatepoll', input, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }


    deletepoll(input: any): Observable<HttpEvent<{}>> {
        const req = new HttpRequest('DELETE', '/api/poll/deletePoll', input, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }
    pollVote(input: any): Observable<HttpEvent<{}>> {
        const req = new HttpRequest('POST', '/api/poll/pollVote', input, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    retrievePollListByUserId(userId: String, status: String): Observable<HttpEvent<{}>> {
        const req = new HttpRequest('GET', '/api/poll/retrievePollListByUserId/' + userId + '/' + status, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    retrievePublishedPollListByContactId(contactId: String): Observable<HttpEvent<{}>> {
        const req = new HttpRequest('GET', '/api/poll/retrievePublishedPollListByContactId/' + contactId, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    retrievePollResult(pollId: String): Observable<HttpEvent<{}>> {
        const req = new HttpRequest('GET', '/api/poll/retrievePollResult/' + pollId, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

    retrieveUserGroupList(user_id: String): Observable<HttpEvent<{}>> {
        const req = new HttpRequest('GET', '/api/poll/retrieveUserGroupList/' + user_id, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(req);
    }

}