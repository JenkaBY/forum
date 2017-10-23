package by.intexsoft.forum.controller;

import by.intexsoft.forum.entity.TopicDiscussRequest;
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

@RestController
@RequestMapping(path = "/topic")
public class TopicDiscussRequestController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(TopicDiscussRequestController.class);
    private TopicDiscussRequestService topicDiscussRequestService;

    @Autowired
    public TopicDiscussRequestController(TopicDiscussRequestService topicRequestService) {
        this.topicDiscussRequestService = topicRequestService;
    }

    @GetMapping(path = "/discuss_request/all")
    public ResponseEntity<?> getAllPending(Pageable pageable) {
        LOGGER.info("{0} requests all pending inTopic discuss requests", "MANAGER");
        return new ResponseEntity<>(topicDiscussRequestService.findAllPending(pageable), OK);
    }

    @PostMapping(path = "/{topicId}/discuss_request/new")
    public ResponseEntity<?> createRequest(@PathVariable("topicId") Long topicId, @RequestBody TopicDiscussRequest request) {
        LOGGER.info("Creating the topicDiscussRequest in the topic {0} was requested by {1}",
                topicId, request.requestedBy.getId());
        if (Objects.isNull(request) || topicId != request.inTopic.getId()) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        TopicDiscussRequest created = this.topicDiscussRequestService.save(request);
        if (Objects.isNull(created)) {
            return new ResponseEntity<>(INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(created, CREATED);
    }

    @GetMapping(path = "/{topicId}/discuss_request")
    public ResponseEntity<?> getTopicDiscussRequestByUserId(@RequestParam("userId") Long userId,
                                                            @PathVariable("topicId") Long topicId) {
        LOGGER.info("Get TopicDiscussRequest by UserId {0} and TopicId {1}.", userId, topicId);

        TopicDiscussRequest discussRequest = topicDiscussRequestService.getByTopicIdAndUserId(topicId, userId);
        return ok(discussRequest);
    }
}