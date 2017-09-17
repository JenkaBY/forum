package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.CreateTopicRequest;
import by.intexsoft.forum.repository.CreateTopicRequestRepository;
import by.intexsoft.forum.service.CreateTopicRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateTopicRequestServiceImpl extends AbstractEntityServiceImpl<CreateTopicRequest> implements CreateTopicRequestService {

    @Autowired
    public CreateTopicRequestServiceImpl(CreateTopicRequestRepository repository) {
        super(repository);
    }
}
