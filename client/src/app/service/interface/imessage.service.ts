import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Topic } from '../../model/topic';
import { Message } from '../../model/message';
import { Page } from "../../model/page";

/**
 * Service for Messages
 */

interface IMessageService {

  getAllMessagesBy(topicId: number, httpParams?: HttpParams): Observable<Page<Message>>;

  createMessage(topic: Topic, message: Message): Observable<Message>;

  updateMessage(message: Message): Observable<Message>;

  deleteMessage(id: number): any;
}

export default IMessageService;
