import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute } from '@angular/router';

import { Constants } from "../../shared/constants/constants";
import { Topic } from '../../shared/entity/topic';
import { Message } from '../../shared/entity/message';
import IMessageService from '../../message/interface/imessage.service';
import { TopicService } from '../topic.service';
import { Page } from "../../shared/entity/page";
import { User } from "../../shared/entity/user";
import IUserService from "../../user/interface/iuser.service";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit, OnDestroy {
  topic: Topic;
  topicId: number;
  messages: Message[];
  currentPage: number;
  totalElements: number;
  pageSize: number;
  maxSize: number;
  authorsMessages: User[];
  subscription: Subscription;

  constructor(@Inject('messageService') private messageService: IMessageService,
              @Inject('topicService') private topicService: TopicService,
              @Inject('userService') private userService: IUserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.maxSize = Constants.getMaxSize;
    this.authorsMessages = new Array();
    this.setTopicId();
    this.fetchTopic();
    this.subscribeOnMessages();
    this.getAllMessages(this.setHttpParams());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeOnMessages() {
    this.subscription = this.messageService.messagesChanged
      .subscribe((page: Page<Message>) => {
          this.setPageData(page);
          console.log(page);
        },
        (error) => {
          this.handleError(error, 'susbcr')
        })
  }

  getAllMessages(httpParams?: HttpParams): void {
    this.setPageData(this.messageService.getAllMessagesBy(this.topicId, httpParams))
    // .subscribe(
    //   (page: Page<Message>) => {},//this.setPageData(page),
    //   (error: HttpErrorResponse) => this.handleError(error));
  }

  fetchTopic(): void {
    this.topicService.getById(this.topicId)
      .subscribe(
        (topic: Topic) => this.topic = topic,
        (error: HttpErrorResponse) => this.handleError(error)
      );
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
    let params = this.setHttpParams().set(Constants.getPageParam, String(this.currentPage - 1));
    console.log("onChangePage " + JSON.stringify(params.toString()));
    this.getAllMessages(params);
  }

  private setPageData(page: Page<Message>) {
    this.messages = page.content;
    this.currentPage = page.number + 1;
    this.totalElements = page.totalElements;
    this.pageSize = page.size;
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

  private handleError(error: HttpErrorResponse, msg?: string) {
    console.error(error, msg);
  }
}
