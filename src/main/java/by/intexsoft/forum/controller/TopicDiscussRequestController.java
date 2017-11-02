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

import java.util.Objects;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.ok;

/**
 * Controller for manage the topic discuss requests
 */
@RestController
@RequestMapping(path = "/topic")
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
     *
     * @param pageable parameters of page
     * @return Page with content
     */
    @GetMapping(path = "/discuss_request/all")
    public ResponseEntity<?> getAllPending(Pageable pageable) {
        LOGGER.info("{0} requests all pending inTopic discuss requests", "MANAGER");
        return new ResponseEntity<>(topicDiscussRequestService.findAllPending(pageable), OK);
    }

    /**
     * Creates topic discuss request in parameters provided in request
     *
     * @param topicId id of topic in which user wants to disscuss
     * @param request data of topic discuss request
     * @return
     */
    @PostMapping(path = "/{topicId}/discuss_request/new")
    public ResponseEntity<?> createRequest(@PathVariable("topicId") Long topicId, @RequestBody TopicDiscussRequest request) {
        LOGGER.info("Creating the topicDiscussRequest in the topic {0} was requested by {1}",
                topicId, request.requestedBy.getId());
        if (Objects.isNull(request) || topicId != request.inTopic.getId()) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        TopicDiscussRequest created = topicDiscussRequestService.save(request);
        if (Objects.isNull(created)) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        return new ResponseEntity<>(created, CREATED);
    }

    /**
     * Updates the given topic discuss request
     *
     * @param requestId id request needed to update
     * @param request   request data
     * @return
     */
    @PutMapping("/discuss_request/{requestId}")
    public ResponseEntity<?> updateRequest(@PathVariable("requestId") Long requestId,
                                           @RequestBody TopicDiscussRequest request) {
        User currentUser = securityHelper.getCurrentUser();

        LOGGER.info("Updating the topicDiscussRequest was requested by {0}", currentUser);
        if (Objects.isNull(request)) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        TopicDiscussRequest updated = topicDiscussRequestService.save(request);
        if (Objects.isNull(updated)) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        return new ResponseEntity<>(OK);
    }

    /**
     * Gets topics discuss request by parameters given in the request params
     *
     * @param userId  id of user
     * @param topicId id of topic
     * @return OK with content in a body
     */
    @GetMapping(path = "/{topicId}/discuss_request")
    public ResponseEntity<?> getTopicDiscussRequestByUserId(@RequestParam("userId") Long userId,
                                                            @PathVariable("topicId") Long topicId) {
        LOGGER.info("Get TopicDiscussRequest by UserId {0} and TopicId {1}.", userId, topicId);

        TopicDiscussRequest discussRequest = topicDiscussRequestService.getByTopicIdAndUserId(topicId, userId);
        return Objects.isNull(discussRequest) ? new ResponseEntity<>(OK) : ok(discussRequest);
    }
}