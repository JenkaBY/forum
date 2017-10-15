package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.repository.TopicRepository;
import by.intexsoft.forum.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TopicServiceImpl extends AbstractEntityServiceImpl<Topic> implements TopicService {

    @Autowired
    public TopicServiceImpl(TopicRepository repository) {
        super(repository);
    }

}
