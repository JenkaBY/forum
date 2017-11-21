import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';

import ITopicService from './interface/itopic.service';
import { Topic } from '../shared/entity/topic';
import { RoutesConst } from '../shared/constants/routes.constants';
import { Page } from '../shared/entity/page';
import { Constants, HeaderConst } from '../shared/constants/constants';
import { User } from '../shared/entity/user';
import IUserService from '../user/interface/iuser.service';

@Injectable()
export class TopicService implements ITopicService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.jsonType);
  constructor(private  http: HttpClient,
              @Inject('cacheableUserService') private userService: IUserService) {
  }

  getAllTopics(httpParams: HttpParams, title?: string): Observable<Page<Topic>> {
    httpParams = title ? httpParams.set(Constants.title, title) : httpParams;
    return this.getTopicsByUrl(RoutesConst.ALL_TOPIC, httpParams);
  }

  getById(id: number): Observable<Topic> {
    return this.http.get(RoutesConst.TOPIC + id);
  }

  deleteById(id: number): any {
    return this.http.delete(RoutesConst.TOPIC + id);
  }

  update(topic: Topic): Observable<Topic> {
    return this.http.put(RoutesConst.TOPIC + topic.id, topic, {headers: this.headers});
  }

  create(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(RoutesConst.TOPIC, topic, {headers: this.headers});
  }

  getAllTopicsCreatedByOrDiscussedUser(userId: number, httpParams: HttpParams): Observable<Page<Topic>> {
    httpParams = httpParams.set(Constants.id, String(userId));
    return this.getTopicsByUrl(RoutesConst.GET_ALL_USER_TOPICS, httpParams);
  }

  private getTopicsByUrl(url: string, httpParams?: HttpParams): Observable<Page<Topic>> {
    let oldPage;
    let result = this.http.get<Page<Topic>>(url, {params: httpParams})
      .map((page: Page<Topic>) => {
        oldPage = page;
        return page.content;
      })
      .flatMap((requests: Topic[]) => {
        if (requests.length > 0) {
          return Observable.forkJoin(
            requests.map((topic: Topic) => {
              return this.userService.getById(topic.createdById)
                .map((user: User) => {
                  topic.createdBy = user;
                  return topic;
                });
            })
          );
        }
        return Observable.of([]);
      })
      .map((array) => {
        oldPage.content = array;
        return oldPage;
      });
    return result;
  }
}
