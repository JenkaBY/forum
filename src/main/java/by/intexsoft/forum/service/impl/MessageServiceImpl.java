package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Message;
import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.repository.MessageRepository;
import by.intexsoft.forum.service.MessageService;
import by.intexsoft.forum.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;

@Service
public class MessageServiceImpl extends AbstractEntityServiceImpl<Message> implements MessageService {

    private TopicService topicService;

    @Autowired
    public MessageServiceImpl(MessageRepository repository, TopicService topicService) {
        super(repository);
        this.topicService = topicService;
    }

    @Override
    public Page<Message> findAllByTopic(Long topicId, Pageable pageable) {
        Topic topic = topicService.find(topicId);
        return ((MessageRepository) repository).findByInTopicOrderByCreatedAt(topic, pageable);
    }

    @Override
    public Message save(Message message) {
        message.updatedAt = new Timestamp(new Date().getTime());
        return this.repository.save(message);
    }
}
