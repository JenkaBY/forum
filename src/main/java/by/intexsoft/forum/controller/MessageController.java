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

import java.util.Objects;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.ok;

/**
 * Controller for manage the messages in the topic
 */
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

    /**
     * Get all message in the topic
     * @param topicId  number of topic for which need to get all messages per page
     * @param pageable parameter for getting data per page
     * @return
     */
    @GetMapping(path = "/topic/{topicId}/all")
    public ResponseEntity<?> getAllMessagesByTopic(@PathVariable(value = "topicId") long topicId, Pageable pageable) {
        return ok(messageService.findAllByTopic(topicId, pageable));
    }

    /**
     * Updates message.
     * @param id  id number of message for updating.
     * @param message message data.
     * @return BAD_REQUEST if message doesn't exist or OK with updated message
     */
    @PutMapping("/message/{id}")
    public ResponseEntity<?> updateMessage(@PathVariable long id, @RequestBody Message message) {
        if (!message.getId().equals(id) || Objects.isNull(message) || message.text.isEmpty()) {
            LOGGER.warn("Attempt to update message with id={} with message = {}", id, message);
            return new ResponseEntity<>(BAD_REQUEST);
        }
        Message updatedMessage = messageService.save(message);
        return ok(updatedMessage);
    }

    /**
     * Delete message
     * @param id id number of message for deleting.
     * @return BAD_REQUEST if message doesn't exist or OK.
     */
    @DeleteMapping(path = "/message/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable long id) {
        Message msagFromDb = messageService.find(id);
        if (Objects.isNull(msagFromDb)) {
            LOGGER.warn("Attempt to delete non-existing message with id={}");
            return new ResponseEntity<>(BAD_REQUEST);
        }
        messageService.delete(id);
        return new ResponseEntity<>(NO_CONTENT);
    }

    /**
     * Create new message
     * @param message Message needed to save in DB.
     * @return BAD_REQUEST if message null or has or createdBy parameter is null.
     * OK with empty object in the body is if message created. Empty body needed for angular
     */
    @PostMapping("/message/new")
    public ResponseEntity<?> createMessage(@RequestBody Message message) {
        if (Objects.isNull(message.createdBy)) {
            LOGGER.warn("Attempt to create message message = {}", message);
            return new ResponseEntity<>(BAD_REQUEST);
        }
        messageService.save(message);
        return new ResponseEntity<>("{}", CREATED);
    }
}
