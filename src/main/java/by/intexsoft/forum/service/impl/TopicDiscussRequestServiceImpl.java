package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.entity.TopicDiscussRequest;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.entity.helper.Status;
import by.intexsoft.forum.repository.TopicDiscussRequestRepository;
import by.intexsoft.forum.service.TopicDiscussRequestService;
import by.intexsoft.forum.service.TopicService;
import by.intexsoft.forum.service.UserService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TopicDiscussRequestServiceImpl extends AbstractEntityServiceImpl<TopicDiscussRequest> implements TopicDiscussRequestService {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(TopicDiscussRequestServiceImpl.class);
    private TopicService topicService;
    private UserService userService;

    @Autowired
    public TopicDiscussRequestServiceImpl(TopicDiscussRequestRepository repository,
                                          TopicService topicService,
                                          UserService userService) {
        super(repository);
        this.topicService = topicService;
        this.userService = userService;
    }

    /**
     * Find all requests in status PENDING.
     *
     * @param pageable Parameters for retrieving requests per one page
     * @return Page<TopicDiscussRequest> one part of all pending requests.
     */
    @Override
    public Page<TopicDiscussRequest> findAllPending(Pageable pageable) {
        return ((TopicDiscussRequestRepository) repository).findByStatus(Status.PENDING, pageable);
    }

    @Override
    public TopicDiscussRequest getByTopicIdAndUserId(long topicId, long userId) {
        Topic topicFromDb = topicService.find(topicId);
        User userFromDb = userService.find(userId);
        return ((TopicDiscussRequestRepository) repository).findFirstByInTopicAndRequestedBy(topicFromDb, userFromDb);
    }

    @Override
    public Page<TopicDiscussRequest> findAllByUser(User user, Pageable pageable) {
        return ((TopicDiscussRequestRepository) repository).findByRequestedBy(user, pageable);
    }

    /**
     * Save topic request in DB. If topicDiscussRequest has status equals Status.APPROVED then the topic will be created too.
     * @param topicDiscussRequest Topic request from the client
     * @return TopicDiscussRequestRepository saved.
     */
    @Override
    public TopicDiscussRequest save(TopicDiscussRequest topicDiscussRequest) {
        if (topicDiscussRequest.status == Status.APPROVED) {
            Topic topic = topicDiscussRequest.inTopic;
            topic.allowedUsers.add(topicDiscussRequest.requestedBy);
            topicService.save(topic);
            topicDiscussRequest.inTopic = topic;
            LOGGER.info("TopicDiscussRequest has Status APPROVED. User id={0} was added to discuss in topic with id = {1} was created.",
                    topicDiscussRequest.requestedBy,
                    topic.getId());
        }
        TopicDiscussRequest req = repository.save(topicDiscussRequest);
        return req;
    }
}
