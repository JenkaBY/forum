import { Component, Input } from '@angular/core';
import { Message } from '../model/message';
import { Constants } from '../common/constants';

@Component({
    selector: 'forum-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {
    @Input() topicTitle: string;
    @Input() message: Message;
    dateFormat = Constants.getDateTimeFormat();
}
