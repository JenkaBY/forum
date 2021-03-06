package by.intexsoft.forum.controller;

import by.intexsoft.forum.entity.TopicDiscussRequest;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.security.SecurityHelper;
import by.intexsoft.forum.service.TopicDiscussRequestService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Objects;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.ok;

/**
 * Controller for manage the topic discuss requests
 */
@RestController
@RequestMapping("/topic")
public class TopicDiscussRequestController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(TopicDiscussRequestController.class);
    private TopicDiscussRequestService topicDiscussRequestService;
    private SecurityHelper securityHelper;

    @Autowired
    public TopicDiscussRequestController(TopicDiscussRequestService topicRequestService, SecurityHelper securityHelper) {
        this.topicDiscussRequestService = topicRequestService;
        this.securityHelper = securityHelper;
    }

    /**
     * Get all pending topics discuss request per page
     * @param pageable parameters of page
     * @return Page with content
     */
    @GetMapping("/discuss_request/all")
    public ResponseEntity<?> getAllPending(Pageable pageable) {
        User currentUser = securityHelper.getCurrentUser();
        LOGGER.info("{} requests all pending inTopic discuss requests", currentUser);
        return new ResponseEntity<>(topicDiscussRequestService.findAllPending(pageable), OK);
    }

    /**
     * Get all pending topics discuss request per page
     * @param pageable parameters of page
     * @return Page with content and page params
     */
    @GetMapping("/discuss_request/my")
    public ResponseEntity<?> getAllUserRequests(Pageable pageable) {
        User currentUser = securityHelper.getCurrentUser();
        LOGGER.info("{} requested all his discuss requests", currentUser);
        return new ResponseEntity<>(topicDiscussRequestService.findAllByUser(currentUser, pageable), OK);
    }

    /**
     * Creates topic discuss request in parameters provided in request
     * @param topicId id of topic in which user wants to discuss
     * @param request data of topic discuss request
     * @return response with created topic discuss request and 200 status code or status code BAD REQUEST
     */
    @PostMapping("/{topicId}/discuss_request/new")
    public ResponseEntity<?> createRequest(@PathVariable long topicId, @RequestBody TopicDiscussRequest request) {
        LOGGER.info("Creating the topicDiscussRequest in the topic {} was requested by {}",
                topicId, request.requestedBy.getId());
        TopicDiscussRequest created = topicDiscussRequestService.save(request);
        if (Objects.isNull(created)) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        return new ResponseEntity<>(created, CREATED);
    }

    /**
     * Updates the given topic discuss request
     * @param requestId id request needed to update
     * @param request   request data
     * @return Response with updated topicDiscussRequest or BadRequest.
     */
    @PutMapping("/discuss_request/{requestId}")
    public ResponseEntity<?> updateRequest(@PathVariable long requestId,
                                           @RequestBody TopicDiscussRequest request) {
        User currentUser = securityHelper.getCurrentUser();
        if (!request.getId().equals(requestId)) {
            LOGGER.warn("User {} was tried to update topic discuss request with id = {}.", currentUser, requestId);
            return new ResponseEntity<>(BAD_REQUEST);
        }

        LOGGER.info("Updating the topicDiscussRequest was requested by {}", currentUser);
        request.approvedBy = currentUser;
        request.approvedAt = new Timestamp(new Date().getTime());
        TopicDiscussRequest updated = topicDiscussRequestService.save(request);
        return ok(updated);
    }

    /**
     * Gets topics discuss request by parameters given in the request params
     * @param userId  id of user
     * @param topicId id of topic
     * @return OK with content in a body
     */
    @GetMapping("/{topicId}/discuss_request")
    public ResponseEntity<?> getTopicDiscussRequestByUserId(@RequestParam long userId,
                                                            @PathVariable long topicId) {
        LOGGER.info("Get TopicDiscussRequest by UserId {} and TopicId {}.", userId, topicId);
        TopicDiscussRequest discussRequest = topicDiscussRequestService.getByTopicIdAndUserId(topicId, userId);
        return Objects.isNull(discussRequest) ? new ResponseEntity<>(NO_CONTENT) : ok(discussRequest);
    }

    /**
     * Deletes topicRequest
     *
     * @param requestId id of topic request to be deleted
     * @return OK if was deleted and Bad_requesr if not
     */
    @DeleteMapping("/discuss_request/{requestId}")
    public ResponseEntity<?> deleteTopicDiscussRequest(@PathVariable long requestId) {
        this.topicDiscussRequestService.delete(requestId);
        return new ResponseEntity<>(Objects.isNull(this.topicDiscussRequestService.find(requestId)) ? NO_CONTENT : BAD_REQUEST);
    }
}