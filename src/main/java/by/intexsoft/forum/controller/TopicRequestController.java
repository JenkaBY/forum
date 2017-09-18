package by.intexsoft.forum.controller;

import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.service.TopicRequestService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestController
@RequestMapping("/topic/request")
public class TopicRequestController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(TopicRequestController.class);

    private TopicRequestService topicRequestService;

    @Autowired
    public TopicRequestController(TopicRequestService topicRequestService) {
        this.topicRequestService = topicRequestService;
    }

    @PostMapping(path = "/new")
    public ResponseEntity<?> createRequest(@RequestBody TopicRequest topicRequest) {
        if (topicRequest == null) {
            LOGGER.warn("Trying to create topic request with null parameter.");
            return new ResponseEntity<>(BAD_REQUEST);
        }
        return ResponseEntity.ok(topicRequestService.save(topicRequest));
    }


}
