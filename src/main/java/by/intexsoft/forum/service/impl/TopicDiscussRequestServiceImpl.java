package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.entity.TopicDiscussRequest;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.entity.helper.Status;
import by.intexsoft.forum.repository.TopicDiscussRequestRepository;
import by.intexsoft.forum.service.StatusService;
import by.intexsoft.forum.service.TopicDiscussRequestService;
import by.intexsoft.forum.service.TopicService;
import by.intexsoft.forum.service.UserService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Objects;

import static by.intexsoft.forum.entity.helper.Status.APPROVED;

@Service
public class TopicDiscussRequestServiceImpl extends AbstractEntityServiceImpl<TopicDiscussRequest> implements TopicDiscussRequestService {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(TopicDiscussRequestServiceImpl.class);
    private TopicService topicService;
    private UserService userService;
    private StatusService statusService;

    @Autowired
    public TopicDiscussRequestServiceImpl(TopicDiscussRequestRepository repository,
                                          TopicService topicService,
                                          UserService userService,
                                          StatusService statusService) {
        super(repository);
        this.topicService = topicService;
        this.userService = userService;
        this.statusService = statusService;
    }

    /**
     * Find all requests in status PENDING.
     *
     * @param pageable Parameters for retrieving requests per one page
     * @return Page<TopicDiscussRequest> one part of all pending requests.
     */
    @Override
    public Page<TopicDiscussRequest> findAllPending(Pageable pageable) {
        return ((TopicDiscussRequestRepository) repository).findByStatus(
                this.statusService.findByTitle(Status.PENDING.name()),
                pageable);
    }

    /**
     * Find user's topic discuss request by Topic Id and User Id.
     *
     * @param topicId the id of seek topic
     * @param userId  the id of user to check if exist his topic discuss request
     * @return found topic discuss request or null.
     */
    @Override
    public TopicDiscussRequest getByTopicIdAndUserId(long topicId, long userId) {
        Topic topicFromDb = topicService.find(topicId);
        User userFromDb = userService.find(userId);
        return ((TopicDiscussRequestRepository) repository).findFirstByInTopicAndRequestedBy(topicFromDb, userFromDb);
    }


    /**
     * Find all user's topic discuss requests per page
     * @param user object for seek topic discuss requests
     * @param pageable Parameters for retrieving requests per one page
     * @return page of all user's requests
     */
    @Override
    public Page<TopicDiscussRequest> findAllByUser(User user, Pageable pageable) {
        return ((TopicDiscussRequestRepository) repository).findByRequestedBy(user, pageable);
    }

    /**
     * Save topic request in DB. If topicDiscussRequest has status equals Status.APPROVED then the topic will be created too.
     *
     * @param topicDiscussRequest Topic request from the client
     * @return TopicDiscussRequestRepository saved.
     */
    @Override
    public TopicDiscussRequest save(TopicDiscussRequest topicDiscussRequest) {
        if (topicDiscussRequest.status.equals(this.statusService.findByTitle(APPROVED.name()))) {
            Topic topic = topicService.find(topicDiscussRequest.inTopic.getId());
            if (Objects.isNull(topic.allowedUsers)) {
                topic.allowedUsers = new HashSet<>();
            }
            topic.allowedUsers.add(topicDiscussRequest.requestedBy);
            topicService.save(topic);
            topicDiscussRequest.inTopic = topic;
            LOGGER.info("TopicDiscussRequest has Status APPROVED. User id={} was added to discuss in topic with id = {} was created.",
                    topicDiscussRequest.requestedBy,
                    topic.getId());
        }
        return repository.save(topicDiscussRequest);
    }

    @Override
    public void delete(long discussRequestId) {
        TopicDiscussRequest discussRequest = this.find(discussRequestId);
        if (discussRequest.status.equals(this.statusService.findByTitle(APPROVED.name()))) {
            Topic discussedTopic = discussRequest.inTopic;
            discussedTopic.removeAllowedUser(discussRequest.requestedBy);
            topicService.save(discussedTopic);
        }
        repository.delete(discussRequest.getId());
    }
}
