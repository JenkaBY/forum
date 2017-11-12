import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { Constants } from '../../shared/constants/constants';
import { Topic } from '../../shared/entity/topic';
import { Message } from '../../shared/entity/message';
import IMessageService from '../../message/interface/imessage.service';
import { TopicService } from '../topic.service';
import { Page } from '../../shared/entity/page';
import { User } from '../../shared/entity/user';
import IUserService from '../../user/interface/iuser.service';
import { AuthenticationService } from '../../authorization/authentication.service';
import { GuardService } from '../../authorization/guard.service';

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
  maxSize: number = Constants.getMaxSize;
  subscriptionOnMsg: Subscription;
  loggedUser: User;
  subscrOnCurrentUser: Subscription;

  constructor(@Inject('messageService') private messageService: IMessageService,
              @Inject('topicService') private topicService: TopicService,
              @Inject('cacheableUserService') private userService: IUserService,
              @Inject('guardService') private guardService: GuardService,
              private authService: AuthenticationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.setTopicId();
    this.subscribeOnCurrentUser();
    this.loadTopic();
    this.subscribeOnMessages();
    this.getAllMessages(this.setHttpParams());
  }

  ngOnDestroy(): void {
    this.subscriptionOnMsg.unsubscribe();
  }

  subscribeOnMessages() {
    this.subscriptionOnMsg = this.messageService.messagesChanged
      .subscribe((page: Page<Message>) => {
          this.setPageData(page);
        },
        (error) => {
          this.handleError(error);
        });
  }

  subscribeOnCurrentUser() {
    this.subscrOnCurrentUser = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.loggedUser = this.authService.getCurrentUser;
  }

  getAllMessages(httpParams?: HttpParams): void {
    this.messageService.getAllMessagesBy(this.topicId, httpParams)
      .subscribe();
  }

  loadTopic(): void {
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
    httpParams = httpParams.set(Constants.getSortParam, Constants.id)
      .set(Constants.getSizeParam, String(Constants.getPageSize));
    return httpParams;
  }

  onPageChange() {
    let params = this.setHttpParams().set(Constants.getPageParam, String(this.currentPage - 1));
    this.getAllMessages(params);
  }

  /**
   *
   * @param {Page<Message>} page
   */
  private setPageData(page: Page<Message>) {
    this.messages = page.content;
    this.currentPage = page.number + 1;
    this.totalElements = page.totalElements;
    this.pageSize = page.size;
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
  }

  canWriteMsg(): boolean {
    return this.guardService.canCreateMsgInTopic(this.topic);
  }
}
