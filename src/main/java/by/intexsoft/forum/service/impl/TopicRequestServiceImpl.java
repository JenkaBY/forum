package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.entity.helper.Status;
import by.intexsoft.forum.repository.TopicRequestRepository;
import by.intexsoft.forum.service.TopicRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TopicRequestServiceImpl extends AbstractEntityServiceImpl<TopicRequest> implements TopicRequestService {

    @Autowired
    public TopicRequestServiceImpl(TopicRequestRepository repository) {
        super(repository);
    }

    @Override
    public Page<TopicRequest> findAllPending(Pageable pageable) {
        return ((TopicRequestRepository) repository).findAllByStatus(Status.PENDING, pageable);
    }

    @Override
    public Page<TopicRequest> findAllByRequestedBy(User user, Pageable pageable) {
        return ((TopicRequestRepository) repository).findByRequestedBy(user, pageable);
    }
}
