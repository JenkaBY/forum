package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.entity.helper.Status;
import by.intexsoft.forum.repository.TopicRequestRepository;
import by.intexsoft.forum.service.TopicRequestService;
import by.intexsoft.forum.service.TopicService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TopicRequestServiceImpl extends AbstractEntityServiceImpl<TopicRequest> implements TopicRequestService {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(TopicRequestServiceImpl.class);
    private TopicService topicService;

    @Autowired
    public TopicRequestServiceImpl(TopicRequestRepository repository, TopicService topicService) {
        super(repository);
        this.topicService = topicService;
    }

    /**
     * Find all requests in status PENDING.
     *
     * @param pageable Parameters for retrieving requests per one page
     * @return Page<TopicRequest> one part of all pending requests.
     */
    @Override
    public Page<TopicRequest> findAllPending(Pageable pageable) {
        return ((TopicRequestRepository) repository).findByStatus(Status.PENDING, pageable);
    }

    /**
     * Find all user's requests in batch.
     * @param user User whom requests should be found
     * @param pageable Parameters for retrieving requests per one page
     * @return Page<TopicRequest> one part of all requests.
     */
    @Override
    public Page<TopicRequest> findAllByRequestedBy(User user, Pageable pageable) {
        return ((TopicRequestRepository) repository).findByRequestedBy(user, pageable);
    }


    /**
     * Save topic request in DB. If topicRequest has status equals Status.APPROVED then the topic will be created too.
     * @param topicRequest Topic request from the client
     * @return TopicRequest saved.
     */
    @Override
    public TopicRequest save(TopicRequest topicRequest) {
        if (topicRequest.status == Status.APPROVED) {
            Topic topic = new Topic();
            topic.title = topicRequest.requestedTopicTitle;
            topic.createdBy = topicRequest.requestedBy;
            topicService.save(topic);
            LOGGER.info("TopicRequest has Status APPROVED. New Topic with id = {0} was created.", topic.getId());
            topicRequest.createdTopic = topic;
        }
        return repository.save(topicRequest);
    }
}
