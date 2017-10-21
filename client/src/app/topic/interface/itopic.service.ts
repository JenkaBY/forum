import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Topic } from '../../shared/entity/topic';
import { Page } from "../../shared/entity/page";

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
