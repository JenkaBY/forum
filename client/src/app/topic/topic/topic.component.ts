import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { Topic } from '../../shared/entity/topic';
import { Message } from '../../shared/entity/message';
import IMessageService from '../../message/interface/imessage.service';
import { TopicService } from '../topic.service';
import { Page } from '../../shared/entity/page';
import { User } from '../../shared/entity/user';
import IUserService from '../../user/interface/iuser.service';
import { AuthenticationService } from '../../authorization/authentication.service';
import { GuardService } from '../../authorization/guard.service';
import { Pageable } from '../../shared/entity/pageable';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ExtendedTranslationService } from '../../shared/translation-service/extended-translation.service';
import { environment } from '../../../environments/environment';

/**
 * Describes the topic page. Shows messages of topic per page. Extends the @Pageable<Message> class.
 *  See @Pageable to modify default behaviour
 */
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent extends Pageable<Message> implements OnInit, OnDestroy {
  topic: Topic;
  topicId: number;
  subscriptionOnMsg: Subscription;
  loggedUser: User;
  subscrOnCurrentUser: Subscription;

  constructor(@Inject('messageService') private messageService: IMessageService,
              @Inject('topicService') private topicService: TopicService,
              @Inject('cacheableUserService') private userService: IUserService,
              @Inject('guardService') private guardService: GuardService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager,
              private authService: AuthenticationService,
              private route: ActivatedRoute) {
    super();
  }

  /**
   * Implements OnInit interface
   * Subscribes on current user, on messages, loads topic data, retrieve messages.
   */
  ngOnInit() {
    this.initTopicId();
    this.subscribeOnCurrentUser();
    this.loadTopic();
    this.subscribeOnMessages();
    this.getAllMessages();
  }

  /**
   * Implementation of OnDestroy interface.
   * Unsubscribes on currentUser and messages.
   */
  ngOnDestroy(): void {
    this.subscriptionOnMsg.unsubscribe();
    this.subscrOnCurrentUser.unsubscribe();
  }

  private subscribeOnMessages() {
    this.subscriptionOnMsg = this.messageService.messagesChanged
      .subscribe((page: Page<Message>) => {
          this.setPageData(page);
        },
        (error) => {
          this.handleError(error);
        });
  }

  private subscribeOnCurrentUser() {
    this.subscrOnCurrentUser = this.authService.changedCurrentUser
      .subscribe((user: User) => {
        this.loggedUser = user;
      });
    this.loggedUser = this.authService.getCurrentUser;
  }

  private getAllMessages(): void {
    this.messageService.getAllMessagesBy(this.topicId, this.getHttpParams())
      .subscribe();
  }

  private loadTopic(): void {
    this.topicService.getById(this.topicId)
      .subscribe(
        (topic: Topic) => this.topic = topic,
        (error: HttpErrorResponse) => this.handleError(error)
      );
  }

  private initTopicId(): void {
    this.route.params.subscribe(params => this.topicId = +params.id);
  }

  /**
   * Need to be invoked after changing page
   * Refresh list of messages according to page parameters
   */
  onPageChange() {
    this.getAllMessages();
  }

  private handleError(error: HttpErrorResponse) {
    this.toastr.error(this.translateService.getTranslate('ERROR.COMMON_ERROR'));
    if (!environment.production) {
      console.log(error);
    }
  }

  /**
   * Defines if current user can be write messages in current topic.
   * @returns {boolean}
   */
  canWriteMsg(): boolean {
    return this.guardService.canCreateMsgInTopic(this.topic);
  }
}
