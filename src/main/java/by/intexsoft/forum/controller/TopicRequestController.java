package by.intexsoft.forum.controller;

import by.intexsoft.forum.dto.TopicRequestDTO;
import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.security.SecurityHelper;
import by.intexsoft.forum.service.TopicRequestService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.ok;

/**
 * Controller for Request of creating a topic
 */
@RestController
@RequestMapping(path = "/topic/request")
public class TopicRequestController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(TopicRequestController.class);
    private TopicRequestService topicRequestService;
    private SecurityHelper securityHelper;

    @Autowired
    public TopicRequestController(TopicRequestService topicRequestService, SecurityHelper securityHelper) {
        this.topicRequestService = topicRequestService;
        this.securityHelper = securityHelper;
    }

    /**
     * Gets all topic Requests with status PENDING. Data is returned per page.
     *
     * @param pageable parameters of page
     * @return OK with page of content
     */
    @GetMapping(path = "/pending")
    public ResponseEntity<?> getAllPending(Pageable pageable) {
        User currentUser = securityHelper.getCurrentUser();
        LOGGER.info("{} requests all pending topic requests", currentUser);
        return new ResponseEntity<>(topicRequestService.findAllPending(pageable)
                .map(TopicRequestDTO::new), OK);
    }

    @GetMapping(path = "/all")
    public ResponseEntity<?> getAll() {
        User currentUser = securityHelper.getCurrentUser();
        LOGGER.info("{} requests all pending topic requests", currentUser);
        return new ResponseEntity<>(topicRequestService.findAll()
                .stream()
                .map(TopicRequestDTO::new)
                .collect(Collectors.toList()),
                OK);
    }

    /**
     * Get all topic Requests created by logged user. Data is returned per page.
     * User is taken from security context
     *
     * @param pageable parameters of page
     * @return page with content
     */
    @GetMapping(path = "/my")
    public ResponseEntity<?> getAllByUser(Pageable pageable) {
//        TODO add CURRENT_USER
        User currentUser = securityHelper.getCurrentUser();
        LOGGER.info("{} requests all own topic requests", currentUser);
        return new ResponseEntity<>(topicRequestService.findAllByRequestedBy(currentUser, pageable), OK);
    }

    /**
     * Creates the new topic request
     *
     * @param topicRequest to be created
     * @return OK with created topic. Or BAD REQUEST if data from body is null
     */
    @PostMapping(path = "/new")
    public ResponseEntity<?> createRequest(@RequestBody TopicRequest topicRequest) {
        User currentUser = securityHelper.getCurrentUser();
        LOGGER.info("New topic request was created by {}", currentUser);
        return new ResponseEntity<>(topicRequestService.save(topicRequest), CREATED);
    }

    /**
     * Updates requests. Used only manager
     *
     * @param id           of topic request
     * @param topicRequest data of request to be updated
     * @return OK with created topic. Or BAD REQUEST if data from body is null or ids (in request parameter and request body)
     * doesn't match
     */
    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateRequest(@PathVariable long id, @RequestBody TopicRequest topicRequest) {
        User currentManager = securityHelper.getCurrentUser();
        if (!topicRequest.getId().equals(id)) {
            LOGGER.warn("Attempt the editing of topic request was by manager id = {}", currentManager);
            return new ResponseEntity<>(BAD_REQUEST);
        }
        LOGGER.info("The Topic Request with id = {} was successfully updated.", topicRequest.getId());
        return ok(topicRequestService.save(topicRequest));
    }

    /**
     * Deletes the topic request by id
     *
     * @param id number of topic request id to be deleted.
     * @return NO_CONTENT status if deleting was successfully
     */
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteTopicRequest(@PathVariable long id) {
        User currentManager = securityHelper.getCurrentUser();
        if (Objects.isNull(topicRequestService.find(id))) {
            LOGGER.warn("Attempt the deleting non existing topic request(id={}) was by manager id = {}", id, currentManager);
            return new ResponseEntity<>(BAD_REQUEST);
        }
        topicRequestService.delete(id);
        LOGGER.info("The Topic Request with id = {} was successfully updated.", id);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
