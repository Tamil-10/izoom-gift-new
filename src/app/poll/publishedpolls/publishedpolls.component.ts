import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { HttpResponse, HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PollService } from '../../service/poll.service';
@Component({
  selector: 'app-publishedpolls',
  templateUrl: './publishedpolls.component.html',
  styleUrls: ['./publishedpolls.component.css'],
  providers: [PollService]
})
export class PublishedpollsComponent implements OnInit {

  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer1cnt: string;
  answer2cnt: string;
  answer3cnt: string;
  answer4cnt: string;
  answer1percentage: string;
  answer2percentage: string;
  answer3percentage: string;
  answer4percentage: string;
  form: FormGroup;
  loading: boolean = false;
  userId: string;
  userName: string;
  errorMsg: string;
  successMsg: string;
  pollId: number;
  pollOwnerId: number

  constructor(private fb: FormBuilder, private pollService: PollService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.createForm();
    this.userId = '1';
    this.userName = 'pandian';
    this.retrievePublishedPollListByContactId(this.userId);
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      answer: null,
      likesordislikes: null,
      comments: null
    });
    console.log("form created");
  }

  private prepareSave(): any {
    let likesordislikes = this.form.get('likesordislikes').value;
    let like: string;
    let dislike: string;
    if (likesordislikes === 'like') {
      like = 'Yes';
    } else if (likesordislikes === 'dislike') {
      dislike = 'Yes';
    }
    let input: any = {
      answer: this.form.get('answer').value,
      like: like,
      dislike: dislike,
      comments: this.form.get('comments').value,
      pollContactAssoc: {
        poll_id: this.pollId,
        responder_id: this.userId
      },
      user_id: this.userId,
      user_name: this.userName,


    };

    return input;
  }

  onSubmit() {
    //console.log(this.form);
    let input = this.prepareSave();
    console.log(input);
    this.loading = true;
    this.pollService.pollVote(input).subscribe(kv => {
      if (kv.type == 4) {
        this.successMsg = "Vote Successfully";
        setTimeout(() => {
          this.successMsg = undefined;
        }, 3000);

        this.retrievePollResult(this.pollId);
      }

    });
    this.loading = false;
  }

  retrievePublishedPollListByContactId(contactId) {
    this.pollService.retrievePublishedPollListByContactId(contactId).subscribe(data => {
      console.log(data);
      if (data instanceof HttpResponse ) {
        console.log(data.body);
        let pollObjList=JSON.parse(''+data.body);
        pollObjList.forEach((pollObj) => {
          this.pollId = pollObj.id
          this.pollOwnerId = pollObj.userId;
          this.question = pollObj.question;
          this.answer1 = pollObj.answer1;
          this.answer2 = pollObj.answer2;
          this.answer3 = pollObj.answer3;
          this.answer4 = pollObj.answer4;
        });


      }
    });
  }

  retrievePollResult(pollId) {
    this.pollService.retrievePollResult(pollId).subscribe(data => {
      console.log(data);
      if (data instanceof HttpResponse ) {
        console.log(data.body);
        let pollObj: any = data.body;
        this.answer1cnt = pollObj.ans1cnt;
        this.answer2cnt = pollObj.ans2cnt;
        this.answer3cnt = pollObj.ans3cnt;
        this.answer4cnt = pollObj.ans4cnt;
        this.answer1percentage = pollObj.ans1percentage;
        this.answer2percentage = pollObj.ans2percentage;
        this.answer3percentage = pollObj.ans3percentage;
        this.answer4percentage = pollObj.ans4percentage;
      }
    });
  }
}
