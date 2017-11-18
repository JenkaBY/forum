import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';

import { RoutesConst } from '../shared/constants/routes.constants';
import IMessageService from './interface/imessage.service';
import { Message } from '../shared/entity/message';
import { Page } from '../shared/entity/page';
import { Constants, HeaderConst } from '../shared/constants/constants';
import { environment } from '../../environments/environment';

/**
 * Implementation of IMessageService
 */
@Injectable()
export class MessageService implements IMessageService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.jsonType);
  messagesChanged = new Subject<Page<Message>>();
  private currentPageInfo = new Page<Message>();

  constructor(private  http: HttpClient) {
  }

  /**
   * Retrieves the all messages by topic Id.
   * @param {number} topicId of messages to be loaded
   * @param {HttpParams} httpParams page params
   * @returns {Observable<Page<Message>>} observiable object with page message data
   */
  getAllMessagesBy(topicId: number, httpParams?: HttpParams): Observable<Page<Message>> {
    return this.http.get<Page<Message>>(RoutesConst.TOPIC + topicId + '/all',
      {params: httpParams})
      .do(
        (page: Page<Message>) => {
          this.setCurrentPageInfo(page);
          this.messagesChanged.next(page);
        },
        (err) => {
          if (!environment.production) {
            console.log('Error from DO', err);
          }
        }
      );
  }

  /**
   * Sends request to deletes message
   * @param {Message} message to be deleted
   * @returns {any} error or Page of Messages.
   */
  deleteMessage(message: Message): any {
    return this.http.delete(RoutesConst.MESSAGE + message.id)
      .do((mes) => {
        this.setPageParamsForDelete();
        this.getAllMessagesBy(message.inTopic.id, this.getHttpParams()).subscribe();
        return mes;
      }, (err) => {
        if (!environment.production) {
          console.log('Error from do delete', err);
        }
        return err;
      });
  }

  /**
   * sends request to update message.
   * @param {Message} message to be updated
   * @returns {Observable<Message>} observable with updated message
   */
  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(RoutesConst.MESSAGE + message.id,
      message, {headers: this.headers});
  }

  /**
   * Sends POST request to create message and return page of messages.
   * @param {Message} message to be created
   * @returns {any} error or Page of Messages.
   */
  createMessage(message: Message): any {
    return this.http.post<Message>(RoutesConst.CREATE_NEW_MESSAGE, message)
      .do((mes) => {
        this.setPageParamsForCreate();
        this.getAllMessagesBy(message.inTopic.id, this.getHttpParams()).subscribe();
        return mes;
      }, (err) => {
        if (!environment.production) {
          console.log('Error from do create', err);
        }
        return err;
      });
  }

  private setCurrentPageInfo(page: Page<Message>): void {
    this.currentPageInfo.number = page.number;
    this.currentPageInfo.first = page.first;
    this.currentPageInfo.last = page.last;
    this.currentPageInfo.numberOfElements = page.numberOfElements;
    this.currentPageInfo.size = page.size;
    this.currentPageInfo.sort = page.sort;
    this.currentPageInfo.totalElements = page.totalElements;
    this.currentPageInfo.totalPages = page.totalPages;
  }

  private setPageParamsForCreate() {
    (this.currentPageInfo.last === true && this.currentPageInfo.size === this.currentPageInfo.numberOfElements) ?
      this.currentPageInfo.number = this.currentPageInfo.totalPages :
      this.currentPageInfo.number = this.currentPageInfo.totalPages - 1;
  }

  private setPageParamsForDelete() {
    if (this.currentPageInfo.last === true
      && this.currentPageInfo.numberOfElements === 1) {
      this.currentPageInfo.number = this.currentPageInfo.totalPages - 2;
    }
  }

  private getHttpParams(): HttpParams {
    return new HttpParams().set(Constants.getSortParam, Constants.id)
      .set(Constants.getSizeParam, String(Constants.getPageSize))
      .set(Constants.getPageParam, String(this.currentPageInfo.number));
  }
}
