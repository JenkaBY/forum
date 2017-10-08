import { Component, Inject, OnInit } from '@angular/core';
import ITopicService from '../service/interface/itopic.service';
import { Topic } from '../model/topic';
import * as _ from 'underscore';

@Component({
    selector: 'forum-topics',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.css']
})

export class TopicsComponent implements OnInit {
    topics: Topic[];
    topic: Topic;
    title: { value: 'Topics' };
    currentPage = 1;

    constructor(@Inject('topicService') private topicService: ITopicService) {
    }

    ngOnInit() {
        this.getAll();
    }

    getAll(): void {
        this.topicService.getAllTopics()
            .then((topics: Topic[]) => this.topics = _.sortBy(topics, 'id'));
    }
}
