package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.dto.TopicDTO;
import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.repository.TopicRepository;
import by.intexsoft.forum.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TopicServiceImpl extends AbstractEntityServiceImpl<Topic> implements TopicService {

    @Autowired
    public TopicServiceImpl(TopicRepository repository) {
        super(repository);
    }

    public Page<TopicDTO> findAllDto(Pageable pageable) {
        return repository.findAll(pageable)
                .map(topic -> new TopicDTO(topic));
    }

    @Override
    public Page<TopicDTO> findAllTopicsDtoByUserId(long userId, Pageable pageable) {
        return ((TopicRepository) repository).findAllTopics(userId, pageable)
                .map(topic -> new TopicDTO(topic));
    }
}
