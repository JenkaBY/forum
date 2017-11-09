package by.intexsoft.forum.service;

import by.intexsoft.forum.entity.TopicDiscussRequest;
import by.intexsoft.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TopicDiscussRequestService extends AbstractEntityService<TopicDiscussRequest> {

    Page<TopicDiscussRequest> findAllPending(Pageable pageable);

    TopicDiscussRequest getByTopicIdAndUserId(long topicId, long userId);

    Page<TopicDiscussRequest> findAllByUser(User user, Pageable pageable);
}