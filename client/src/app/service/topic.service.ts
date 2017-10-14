import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import ITopicService from './interface/itopic.service';
import { Topic } from '../model/topic';
import { RoutesConstants } from '../common/routes.constants';

@Injectable()
export class TopicService implements ITopicService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private  http: Http) {
    }

    getAllTopics(): Promise<Topic[]> {
      return this.http.get(RoutesConstants.ALL_TOPIC)
            .toPromise()
            .then(response => {
                console.log(response);
                return response.json();
            })
            .catch(error => this.errorHandle(error));
    }

    getById(id: number): Promise<Topic> {
      return this.http.get(RoutesConstants.TOPIC + id)
            .toPromise()
            .then(response => {
                console.log(response);
                return response.json();
            })
            .catch(error => this.errorHandle(error));
    }

    deleteById(id: number): void {
        throw new Error('Method not implemented.');
    }


    update(topic: Topic): Promise<Topic> {
      return this.http.put(RoutesConstants.TOPIC + topic.id, JSON.stringify(topic), {headers: this.headers})
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(error => this.errorHandle(error));
    }

    create(topic: Topic): Promise<Topic> {
        return null;
    }

    private errorHandle(error): Promise<Topic> {
        console.log(error);
        return null;
    }
}
