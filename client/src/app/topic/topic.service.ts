import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import ITopicService from '../service/interface/itopic.service';
import { Topic } from '../model/topic';
import { RoutesConst } from '../common/routes.constants';
import { Page } from "../model/page";
import { HeaderConst } from "../common/constants";

@Injectable()
export class TopicService implements ITopicService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.jsonType);

  constructor(private  http: HttpClient) {
  }

  getAllTopics(httpParams?: HttpParams): Observable<Page<Topic>> {
    console.log("service", httpParams.toString());
    return this.http.get(RoutesConst.ALL_TOPIC, {params: httpParams});
  }

  getById(id: number): Observable<Topic> {
    return this.http.get(RoutesConst.TOPIC + id);
  }

  deleteById(id: number): any {
    return this.http.delete(RoutesConst.TOPIC + id);
  }


  update(topic: Topic): Observable<Topic> {
    return this.http.put(RoutesConst.TOPIC + topic.id, JSON.stringify(topic), {headers: this.headers});
  }

  create(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(RoutesConst.TOPIC, topic, {headers: this.headers});
  }
}
