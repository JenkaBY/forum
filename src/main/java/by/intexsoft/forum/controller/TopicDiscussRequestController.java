package by.intexsoft.forum.controller;

import by.intexsoft.forum.service.TopicDiscussRequestService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping(path = "/topic")
public class TopicDiscussRequestController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(TopicDiscussRequestController.class);
    private TopicDiscussRequestService topicDiscussRequestService;

    @Autowired
    public TopicDiscussRequestController(TopicDiscussRequestService topicRequestService) {
        this.topicDiscussRequestService = topicRequestService;
    }

    @GetMapping(path = "/{id}/discuss_request")
    public ResponseEntity<?> getAllPending(@PathVariable(value = "id") Long topicId, Pageable pageable) {
        LOGGER.info("{0} requests all pending topic discuss requests", "MANAGER");
        return new ResponseEntity<>(topicDiscussRequestService.findAllPending(topicId, pageable), OK);
    }
}