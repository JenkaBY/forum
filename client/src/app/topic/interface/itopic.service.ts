import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Topic } from '../../model/topic';
import { Page } from "../../model/page";

/**
 * Service for Topic
 */
interface ITopicService {

  getAllTopics(urlParams?: HttpParams): Observable<Page<Topic>>;

  getById(id: number): Observable<Topic>;

  deleteById(id: number): any;

  update(topic: Topic): Observable<Topic>;

  create(topic: Topic): Observable<Topic>;
}

export default ITopicService;
