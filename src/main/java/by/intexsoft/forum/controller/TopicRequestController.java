package by.intexsoft.forum.controller;

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

import static org.springframework.http.HttpStatus.*;

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
//        TODO add checking isManager?
        LOGGER.info("{0} requests all pending topic requests", "ADMIN");
        return new ResponseEntity<>(topicRequestService.findAllPending(pageable), OK);
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
        LOGGER.info("{0} requests all own topic requests", currentUser);
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
        if (topicRequest == null) {
            LOGGER.warn("Trying to create topic request with null parameter.");
            return new ResponseEntity<>(BAD_REQUEST);
        }
        //TODO add CURRENT_USER
        User currentUser = new User();
        LOGGER.info("New topic request was created by ", currentUser);
        return new ResponseEntity(topicRequestService.save(topicRequest), CREATED);
    }

    /**
     * Updates requests. Used only manager
     * @param id of topic request
     * @param topicRequest data of request to be updated
     * @return OK with created topic. Or BAD REQUEST if data from body is null or ids (in request parameter and request body)
     * doesn't match
     */
    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateRequest(@PathVariable(value = "id") Long id, @RequestBody TopicRequest topicRequest) {
        if ((topicRequest == null) || (!topicRequest.getId().equals(id))) {
            LOGGER.warn("Attempt the editing of topic request was by {0}", "ADMIN_SHOULD_BE_HERE");
            return new ResponseEntity<>(BAD_REQUEST);
        }
        LOGGER.info("The Topic Request with id = {0} was successfully updated.", topicRequest.getId());
        return ResponseEntity.ok(topicRequestService.save(topicRequest));
    }

    /**
     * Deletes the topic request by id
     * @param id number of topic request id to be deleted.
     * @return OK status
     */
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteTopicRequest(@PathVariable(value = "id") Long id) {
        topicRequestService.delete(id);
        LOGGER.info("The Topic Request with id = {0} was successfully updated.", id);
        return new ResponseEntity<>(OK);
    }
}
