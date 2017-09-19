package by.intexsoft.forum.controller;

import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.service.TopicRequestService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping(path = "/topic/request")
public class TopicRequestController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(TopicRequestController.class);
    private TopicRequestService topicRequestService;

    @Autowired
    public TopicRequestController(TopicRequestService topicRequestService) {
        this.topicRequestService = topicRequestService;
    }

    @GetMapping(path = "/pending")
    public ResponseEntity<?> getAllPending(Pageable pageable) {
//        TODO add checking isAdmin?
        LOGGER.info("{0} requests all pending topic requests", "ADMIN");
        return new ResponseEntity<>(topicRequestService.findAllPending(pageable), OK);
    }

    @GetMapping(path = "/my")
    public ResponseEntity<?> getAllByUser(Pageable pageable) {
//        TODO add CURRENT_USER
        User currentUser = new User();
        LOGGER.info("{0} requests all own topic requests", currentUser);
        return new ResponseEntity<>(topicRequestService.findAllByRequestedBy(currentUser, pageable), OK);
    }

    @PostMapping(path = "/new")
    public ResponseEntity<?> createRequest(@RequestBody TopicRequest topicRequest) {
        if (topicRequest == null) {
            LOGGER.warn("Trying to create topic request with null parameter.");
            return new ResponseEntity<>(BAD_REQUEST);
        }
        //TODO add CURRENT_USER
        User currentUser = new User();
        LOGGER.info("New topic request was created by ", currentUser);
        return new ResponseEntity(topicRequestService.save(topicRequest), CREATED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateRequest(@PathVariable(value = "id") Long id, @RequestBody TopicRequest topicRequest) {
        if ((topicRequest == null) || (!topicRequest.getId().equals(id))) {
            LOGGER.warn("Attempt the editing of topic request was by {0}", "ADMIN_SHOULD_BE_HERE");
            return new ResponseEntity<>(BAD_REQUEST);
        }
        LOGGER.info("The Topic Request with id = {0} was successfully updated.", topicRequest.getId());
        return ResponseEntity.ok(topicRequestService.save(topicRequest));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteTopicRequest(@PathVariable(value = "id") Long id) {
        topicRequestService.delete(id);
        LOGGER.info("The Topic Request with id = {0} was successfully updated.", id);
        return new ResponseEntity<>(OK);
    }
}
