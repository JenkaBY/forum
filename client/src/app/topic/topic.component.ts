import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { Constants } from "../common/constants";
import { Topic } from '../model/topic';
import { Message } from '../model/message';
import IMessageService from '../service/interface/imessage.service';
import { TopicService } from '../service/topic.service';
import { Page } from "../model/page";
import { User } from "../model/user";
import IUserService from "../service/interface/iuser.service";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  topic: Topic;
  topicId: number;
  messages: Message[];
  currentPage: number;
  totalElements: number;
  pageSize: number;
  maxSize: number;
  msgForm: FormGroup;
  authorsMessages: User[];

  constructor(@Inject('messageService') private messageService: IMessageService,
              @Inject('topicService') private topicService: TopicService,
              @Inject('userService') private userService: IUserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.maxSize = Constants.getMaxSize;
    this.authorsMessages = new Array();
    this.initForm();
    this.setTopicId();
    this.getTopic();
    this.getAllMessages(this.setHttpParams());
    console.log("onInit " + JSON.stringify(this.setHttpParams().toString()));
  }

  getAllMessages(httpParams?: HttpParams): void {
    this.messageService.getAllMessagesBy(this.topicId, httpParams)
      .subscribe(
        (page: Page<Message>) => this.setPageData(page),
        (error: HttpErrorResponse) => this.handleError(error));
  }

  getTopic(): void {
    this.topicService.getById(this.topicId)
      .then(topic => this.topic = topic)
      .catch(error => console.log(JSON.stringify(error)));
  }

  setTopicId(): void {
    this.route.params.subscribe(params => this.topicId = +params.id);
  }

  private setHttpParams(httpParams?: HttpParams): HttpParams {
    if (!httpParams) {
      httpParams = new HttpParams();
    }
    httpParams = httpParams.set(Constants.getSortParam, 'id')
      .set(Constants.getSizeParam, String(Constants.getPageSize));
    return httpParams;
  }

  onPageChange() {
    const params = this.setHttpParams();
    params.append(Constants.getPageParam, String(this.currentPage - 1));
    console.log("onChangePage " + JSON.stringify(params.toString()));
    this.getAllMessages(params);
  }

  private setPageData(page: Page<Message>) {
    this.messages = page.content;
    this.currentPage = page.number + 1;
    this.totalElements = page.totalElements;
    this.pageSize = page.size;
  }

  private initForm() {
    this.msgForm = new FormGroup({
      'msgData': new FormGroup({
        'text': new FormControl(null),
        'createdBy': new FormControl(null),
        'inTopic': new FormControl(this.topic),
        'createdAt': new FormControl(new Date()),
        'updatedAt': new FormControl(null),
        'updatedBy': new FormControl(null)
      })
    })
  }

  private fetchAuthors() {
    this.messages.forEach((message: Message) => {
      if (!this.authorsMessages.map((author: User) => author.id).includes(message.createdBy.id)) {
        this.userService.getById(message.createdBy.id)
          .subscribe((user: User) => this.authorsMessages.push(user),
            (error: HttpErrorResponse) => this.handleError(error));
      }
    })
  }

  private setCreatedByForMessages() {
    this.messages.forEach((message: Message) => {
      message.createdBy = this.authorsMessages
        .find((user: User) => user.id === message.createdBy.id);
    })
  }

  getAuthorBy(id: number) {
    return this.authorsMessages.find((user: User) => user.id === id);
  }

  onSendMsg() {
    // this.messageService.createMessage()
    console.log("onSendMessage")
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
  }
}
