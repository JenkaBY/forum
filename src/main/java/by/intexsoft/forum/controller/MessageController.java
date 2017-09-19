package by.intexsoft.forum.controller;

import by.intexsoft.forum.service.MessageService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping(path = "/topic")
public class MessageController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(MessageController.class);
    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping(path = "/{topicId}/all")
    public ResponseEntity<?> getAllMessagesByTopic(@PathVariable(value = "topicId") Long topicId, Pageable pageable) {

        return ok(messageService.findAllByTopic(topicId, pageable));
    }
}
