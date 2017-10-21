import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { RoutesConst } from '../shared/constants/routes.constants';
import IMessageService from './interface/imessage.service';
import { Message } from '../shared/entity/message';
import { Page } from "../shared/entity/page";
import { HeaderConst } from "../shared/constants/constants";

@Injectable()
export class MessageService implements IMessageService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.jsonType);
  messagesChanged = new Subject<Page<Message>>();
  private messages = new Page<Message>();

  constructor(private  http: HttpClient) {
  }

  getAllMessagesBy(topicId: number, httpParams?: HttpParams) {
    return this.http.get<Page<Message>>(RoutesConst.TOPIC + topicId + '/all',
      {params: httpParams})
      .subscribe(
        (page: Page<Message>) => {
          this.messages = page;
          this.messagesChanged.next(page);
          console.log('From MsgService', page);
        }
      );
  }

  deleteMessage(id: number): any {
    return this.http.delete(RoutesConst.MESSAGE + id);
  }

  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(RoutesConst.MESSAGE + message.id,
      message, {headers: this.headers});
  }

  createMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(RoutesConst.CREATE_NEW_MESSAGE, message);
  }
}
