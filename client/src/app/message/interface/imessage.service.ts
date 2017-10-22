import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { Message } from '../../shared/entity/message';
import { Page } from "../../shared/entity/page";

/**
 * Service for Messages
 */

interface IMessageService {
  messagesChanged: Subject<Page<Message>>;

  getAllMessagesBy(topicId: number, httpParams?: HttpParams);

  createMessage(message: Message): any;

  updateMessage(message: Message): Observable<Message>;

  deleteMessage(message: Message): any;
}

export default IMessageService;
