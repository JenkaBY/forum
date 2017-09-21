import { Topic } from '../../model/topic';

/**
 * Service for Topic
 */
interface ITopicService {

    getAllTopics(): Promise<Topic[]>;

    getById(id: number): Promise<Topic>;

    deleteById(id: number): void;

    // update(topic: Topic): Promise<Topic>;

    create(topic: Topic): Promise<Topic>;
}

export default ITopicService;
