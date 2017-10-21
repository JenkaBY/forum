import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { RoutesConst } from '../shared/constants/routes.constants';
import IMessageService from './interface/imessage.service';
import { Message } from '../shared/entity/message';
import { Page } from "../shared/entity/page";
import { HeaderConst } from "../shared/constants/constants";

@Injectable()
export class MessageService implements IMessageService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.jsonType);

  constructor(private  http: HttpClient) {
  }

  getAllMessagesBy(topicId: number, httpParams?: HttpParams): Observable<Page<Message>> {
    return this.http.get<Page<Message>>(RoutesConst.TOPIC + topicId + '/all',
      {params: httpParams});
  }

  deleteMessage(id: number): any {
    return this.http.delete(RoutesConst.MESSAGE + id);
  }

  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(RoutesConst.MESSAGE + message.id,
      message,
      {headers: this.headers});
  }

  createMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(RoutesConst.CREATE_NEW_MESSAGE, message);
  }
}
