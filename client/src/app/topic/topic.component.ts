import { Component, Inject, OnInit } from '@angular/core';
import { Topic } from '../model/topic';
import { Message } from '../model/message';
import IMessageService from '../service/interface/imessage.service';
import { TopicService } from '../service/topic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'forum-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  topic: Topic;
  topicId: number;
  messages: Message[];
  currentPage: number;
  totalElements: number;
  pageSize: number;
  maxSize: number;

  constructor(@Inject('messageService') private messageService: IMessageService,
              @Inject('topicService') private topicService: TopicService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.setTopicId();
    this.getTopic();
    this.getAllMessages();
  }

  getAllMessages(): void {
    this.messageService.getAllMessages(this.topicId)
      .then(messages => this.messages = messages);
    // .catch();
  }

  getTopic(): void {
    this.topicService.getById(this.topicId)
      .then(topic => this.topic = topic);
    // .catch();
  }

  setTopicId(): void {
    this.route.params.subscribe(params => this.topicId = +params.id);
  }

  onPageChange() {

  }
}
