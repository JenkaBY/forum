import { Component, Inject, OnInit } from '@angular/core';
import { Topic } from '../model/topic';
import { Message } from '../model/message';
import IMessageService from '../service/interface/imessage.service';
import * as _ from 'underscore';
import { TopicService } from '../service/topic.service';

@Component({
    selector: 'forum-topic',
    templateUrl: './topic.component.html',
    styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
    topic: Topic;
    messages: Message[];

    constructor(@Inject('messageService') private messageService: IMessageService,
                @Inject('topicService') private topicService: TopicService) {
    }

    ngOnInit() {
        // this.topicService;
        this.getAll();
    }

    getAll(): void {
        this.messageService.getAllMessages(this.topic)
            .then((messages: Message[]) => this.messages = _.sortBy(messages, 'id'));
    }

}
