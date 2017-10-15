import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import ITopicService from './interface/itopic.service';
import { Topic } from '../model/topic';
import { RoutesConstants } from '../common/routes.constants';
import { Page } from "../model/page";

@Injectable()
export class TopicService implements ITopicService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private  http: Http) {
  }

  getAllTopics(urlParams?: URLSearchParams): Promise<Page<Topic>> {
    const params = new RequestOptions({params: urlParams});
    console.log("service " + urlParams.toString());
    return this.http.get(RoutesConstants.ALL_TOPIC, params)
      .toPromise()
      .then(response => {
        console.log("topic service " + response.json());
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
      .catch((error: any) => this.errorHandle(error));
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

  private errorHandle(error: any): Promise<Topic> {
    console.log(error);
    return null;
  }
}
