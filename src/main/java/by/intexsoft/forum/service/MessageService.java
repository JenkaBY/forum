package by.intexsoft.forum.service;

import by.intexsoft.forum.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MessageService extends AbstractEntityService<Message> {
    Page<Message> findAllByTopic(Long topicId, Pageable pageable);

    @Override
    Message save(Message message);
}