package by.intexsoft.forum.controller;

import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.service.TopicRequestService;
import by.intexsoft.forum.service.TopicService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/manager")
public class ManagerController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(ManagerController.class);

    private TopicRequestService topicRequestService;
    private TopicService topicService;

    @Autowired
    public ManagerController(TopicRequestService topicRequestService, TopicService topicService) {
        this.topicRequestService = topicRequestService;
        this.topicService = topicService;
    }

    @PutMapping(path = "/topic/request/{id}/approve")
    public ResponseEntity<?> approveRequest(@PathVariable(value = "id") Long id) {
//        TODO move logic into service layer
        TopicRequest topicRequest = topicRequestService.find(id);
        if (topicRequest == null) {
            LOGGER.warn("Trying to approve non-existing topic request.");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Topic topic = new Topic();
        topic.title = topicRequest.requestedTopicTitle;
        topic.createdBy = topicRequest.requestedBy;
        topicService.save(topic);
        return ResponseEntity.ok("Request was approved and new topic was successfully created.");
    }

}
