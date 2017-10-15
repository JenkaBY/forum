package by.intexsoft.forum.controller;

import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.service.TopicService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping(path = "/topic")
public class TopicController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(TopicController.class);
    private TopicService topicService;

    @Autowired
    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @PostMapping(path = "/new")
    public ResponseEntity<?> create(@RequestBody Topic topic) {
//        TODO topic can create only administrator!!!
        if (topic == null) {
            LOGGER.warn("User {0} was tried to create topic with null parameters.", "MANAGER_SHOULD_BE_HERE");
            return new ResponseEntity<>(BAD_REQUEST);
        }
        Topic savedTopic = topicService.save(topic);
        LOGGER.info("The topic with id = {0} was created,", savedTopic.getId());
        return ok(savedTopic);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> readTopic(@PathVariable(name = "id") Long id) {
        LOGGER.info("Get topic with id = {}", id);
        return ok(topicService.find(id));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteTopic(@PathVariable(name = "id") Long id) {
        LOGGER.info("User with id = {0} was deleted topic with id = {1}", "USER_ID", id);
        topicService.delete(id);
        return new ResponseEntity<>(OK);
    }

    @GetMapping(path = "/all")
    public ResponseEntity<?> getAllTopic(Pageable pageable) {
        LOGGER.info("Request all topics");
        return ok(topicService.findAll(pageable));
    }
}
