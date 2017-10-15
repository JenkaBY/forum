import { URLSearchParams } from '@angular/http';

import { Topic } from '../../model/topic';
import { Page } from "../../model/page";

/**
 * Service for Topic
 */
interface ITopicService {

  getAllTopics(urlParams?: URLSearchParams): Promise<Page<Topic>>;

  getById(id: number): Promise<Topic>;

  deleteById(id: number): void;

  // update(topic: Topic): Promise<Topic>;

  create(topic: Topic): Promise<Topic>;
}

export default ITopicService;
