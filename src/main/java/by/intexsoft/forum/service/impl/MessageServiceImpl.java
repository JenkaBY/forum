package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Message;
import by.intexsoft.forum.repository.MessageRepository;
import by.intexsoft.forum.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageServiceImpl extends AbstractEntityServiceImpl<Message> implements MessageService {

    @Autowired
    public MessageServiceImpl(MessageRepository repository) {
        super(repository);
    }
}
