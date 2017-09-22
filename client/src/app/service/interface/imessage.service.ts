import { Topic } from '../../model/topic';
import { Message } from '../../model/message';

/**
 * Service for Messages
 */

interface IMessageService {
    getAllMessages(topicId: number): Promise<Message[]>;

    createMessage(topic: Topic, message: Message): Promise<Message>;

    updateMessage(message: Message): Promise<Message>;

    deleteMessage(id: number): void;
}

export default IMessageService;