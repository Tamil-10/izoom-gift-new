import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpRequest, HttpClient, HttpParams } from '@angular/common/http';
import { Poll } from '../../model/poll';
import { SearchCriteria } from '../../model/searchcriteria';
import { PollService } from '../../service/poll.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-managepollconfig',
  templateUrl: './managepollconfig.component.html',
  styleUrls: ['./managepollconfig.component.css'],
  providers: [Poll, SearchCriteria, PollService, HttpClient]
})
export class ManagepollconfigComponent implements OnInit {

  pollId: string;
  errorMsg: string;
  successMsg: string;
  userId: string;
  userName: string;
  status: string;

  polllist: any = [];
  constructor(private http: HttpClient, private searchCriteria: SearchCriteria, private poll: Poll, private pollService: PollService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.searchCriteria.start = 0;
    this.searchCriteria.limit = 10;
    this.userId = '1';
    this.userName = 'pandian';
    this.status = 'Published';


  }



  ngOnInit() {
    this.retrievePublishedPollListByUserId(this.userId,this.status);
  }


  onSubmit() {
    let pollId = this.poll.id;
    console.log(pollId);
    this.router.navigate(['/pollconfigupdate'], { queryParams: { pollId: pollId } });
  }


  retrievePollList(value) {
    this.status = value;
    console.log("status:::::" + this.status);
    this.retrievePublishedPollListByUserId(this.userId, this.status);
  }
  retrievePublishedPollListByUserId(userId, status) {
    this.pollService.retrievePollListByUserId(userId, status).subscribe(data => {
      console.log(data);
      if (data instanceof HttpResponse ) {
        console.log(data.body);
        let pollObjList = JSON.parse('' + data.body);
        this.polllist = [];
        pollObjList.forEach((element) => {
          this.polllist.push({ "id": element.id, "question": element.question, "status": element.status });
        });

      }
    });
  }

  remove(poll){
    poll.status="Deleted"
     this.pollService.deletepoll(poll).subscribe(kv => {
        if (kv.type == 4) {
           this.successMsg = "Deleted Successfully";
           this.retrievePublishedPollListByUserId(this.userId,this.status);
          setTimeout(() => {
            this.successMsg = undefined;            
          }, 3000);
        }

    
      });
  }
}
