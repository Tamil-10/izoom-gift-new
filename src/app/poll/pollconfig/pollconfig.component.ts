import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Poll } from '../../model/poll';
import { PollService } from '../../service/poll.service'

@Component({
  selector: 'app-pollconfig',
  templateUrl: './pollconfig.component.html',
  styleUrls: ['./pollconfig.component.css'],
  providers: [Poll, PollService]
})
export class PollconfigComponent implements OnInit {
  userId: string;
  userName: string;
  groupList: any = [];
  pollId: string;
  errorMsg: string;
  successMsg: string;
  constructor(private poll: Poll, private pollService: PollService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.userId = '1';
    this.userName = 'pandian';
    this.retrieveUserGroupList(this.userId);
    let url = this.router.url;

    if (url === '/pollconfigcreate') {
      this.poll.publishtimelimit = 1;
      this.poll.status = 'Not Published'
    } else {

      this.activatedRoute.queryParams.subscribe(params => {
        console.log('...................' + params);
        console.log(params);
        this.pollId = params['pollId'];
        console.log(this.pollId);
        this.retrievePoll(this.pollId);
      });
    }
  }

  ngOnInit() {
  }

  validate() {
    if (this.poll.status == 'Published') {
      let groupIds = this.poll.groupId;
      if (groupIds == null) {
        return "Groups Selection is Mandatory if Status is 'Published'";
      }
    }
    return true;
  }

  onSubmit() {
    //console.log(this.form);
    let result = this.validate();
    if (result == true) {
      this.poll.user_id = Number(this.userId);
      this.pollService.save(this.poll).subscribe(kv => {
        if (kv.type == 4) {
          if (this.pollId == undefined) {
            this.successMsg = "Created Successfully";
          } else {
            this.successMsg = "Update Successfully";
          }
          setTimeout(() => {
            this.successMsg = undefined;
          }, 3000);
        }

        if (kv instanceof HttpResponse ) {
          console.log(kv.body);
          let pollObj: any = kv.body;
          this.pollId = pollObj.id;
        }
      });

    } else {
      this.errorMsg = result;
      setTimeout(() => {
        this.errorMsg = undefined;
      }, 5000);
    }
  }

  retrievePoll(pollId) {
    console.log("retrievePoll::" + pollId)
    this.pollService.retrievePoll(pollId).subscribe(data => {
      console.log(data);
      if (data instanceof HttpResponse ) {
        console.log(data.body);
        this.poll = JSON.parse('' + data.body);
      }
    });
  }

  retrieveUserGroupList(user_id) {
    this.pollService.retrieveUserGroupList(user_id).subscribe(data => {
      console.log(data);
      if (data instanceof HttpResponse ) {
        console.log(data.body);
        let pollObjList: any = JSON.parse('' + data.body);
        pollObjList.forEach((element) => {
          this.groupList.push({ "id": element.id, "name": element.group_name });
        });
      }
    });
  }

}
