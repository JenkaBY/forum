import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Message } from '../../shared/entity/message';
import { Page } from "../../shared/entity/page";

/**
 * Service for Messages
 */

interface IMessageService {

  getAllMessagesBy(topicId: number, httpParams?: HttpParams): Observable<Page<Message>>;

  createMessage(message: Message): Observable<Message>;

  updateMessage(message: Message): Observable<Message>;

  deleteMessage(id: number): any;
}

export default IMessageService;
