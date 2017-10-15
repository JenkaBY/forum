import { URLSearchParams } from '@angular/http';

import { Topic } from '../../model/topic';
import { Message } from '../../model/message';
import { Page } from "../../model/page";

/**
 * Service for Messages
 */

interface IMessageService {

  getAllMessagesBy(topicId: number, urlParams?: URLSearchParams): Promise<Page<Message>>;

  createMessage(topic: Topic, message: Message): Promise<Message>;

  updateMessage(message: Message): Promise<Message>;

  deleteMessage(id: number): void;
}

export default IMessageService;
