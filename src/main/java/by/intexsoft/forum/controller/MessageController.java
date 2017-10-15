package by.intexsoft.forum.controller;

import by.intexsoft.forum.entity.Message;
import by.intexsoft.forum.service.MessageService;
import by.intexsoft.forum.service.UserService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping
public class MessageController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(MessageController.class);
    private MessageService messageService;
    private UserService userService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping(path = "/topic/{topicId}/all")
    public ResponseEntity<?> getAllMessagesByTopic(@PathVariable(value = "topicId") Long topicId, Pageable pageable) {

        return ok(messageService.findAllByTopic(topicId, pageable));
    }

    @PutMapping(path = "/message/{id}")
    public ResponseEntity<?> updateMessage(@PathVariable(value = "id") Long id, @RequestBody Message message) {
//        TODO Create authorized request
        if (message.getId() != id) {
            LOGGER.warn("Attempt to update message with id={0} with message = {1}", id, message);
            return new ResponseEntity<>(BAD_REQUEST);
        }
//        message.updatedBy = userService.find(2);//        TODO Need to change to currentUser
        Message updatedMessage = messageService.save(message);

        return ok(updatedMessage);
    }
}
