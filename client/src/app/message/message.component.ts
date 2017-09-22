import { Component, Input } from '@angular/core';
import { Message } from '../model/message';

@Component({
    selector: 'forum-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {
    @Input() message: Message;
}
