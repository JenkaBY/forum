package by.intexsoft.forum.service;

import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TopicRequestService extends AbstractEntityService<TopicRequest> {
    Page<TopicRequest> findAllPending(Pageable pageable);

    Page<TopicRequest> findAllByRequestedBy(User user, Pageable pageable);
}