package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.entity.helper.Status;
import by.intexsoft.forum.repository.TopicRequestRepository;
import by.intexsoft.forum.service.TopicRequestService;
import by.intexsoft.forum.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TopicRequestServiceImpl extends AbstractEntityServiceImpl<TopicRequest> implements TopicRequestService {
    private TopicService topicService;

    @Autowired
    public TopicRequestServiceImpl(TopicRequestRepository repository, TopicService topicService) {
        super(repository);
        this.topicService = topicService;
    }

    @Override
    public Page<TopicRequest> findAllPending(Pageable pageable) {
        return ((TopicRequestRepository) repository).findAllByStatus(Status.PENDING, pageable);
    }

    @Override
    public Page<TopicRequest> findAllByRequestedBy(User user, Pageable pageable) {
        return ((TopicRequestRepository) repository).findByRequestedBy(user, pageable);
    }


    @Override
    public TopicRequest save(TopicRequest topicRequest) {
        if (topicRequest.status == Status.APPROVED) {
            Topic topic = new Topic();
            topic.title = topicRequest.requestedTopicTitle;
            topic.createdBy = topicRequest.requestedBy;
            topicService.save(topic);
            topicRequest.createdTopic = topic;
        }
        return repository.save(topicRequest);
    }
}
