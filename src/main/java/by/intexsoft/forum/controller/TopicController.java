package by.intexsoft.forum.controller;

import by.intexsoft.forum.dto.TopicDTO;
import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.security.SecurityHelper;
import by.intexsoft.forum.service.TopicService;
import by.intexsoft.forum.service.UserService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.ResponseEntity.ok;

/**
 * Controller for manage the topics
 */
@RestController
@RequestMapping(path = "/topic")
public class TopicController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(TopicController.class);
    private TopicService topicService;
    private SecurityHelper securityHelper;
    private UserService userService;

    @Autowired
    public TopicController(TopicService topicService, SecurityHelper securityHelper, UserService userService) {
        this.topicService = topicService;
        this.securityHelper = securityHelper;
        this.userService = userService;
    }

    /**
     * Creates the topic given in the body.
     *
     * @param topic that need to be created
     * @return BAD REQUEST if topic data is null. OK with created topic in the body if it has been created.
     */
    @PostMapping(path = "/new")
    public ResponseEntity<?> create(@RequestBody Topic topic) {
        if (topic == null) {
            LOGGER.warn("User {0} was tried to create topic with null parameters.", "MANAGER_SHOULD_BE_HERE");
            return new ResponseEntity<>(BAD_REQUEST);
        }
        Topic savedTopic = topicService.save(topic);
        LOGGER.info("The topic with id = {0} was created,", savedTopic.getId());
        return ok(savedTopic);
    }

    /**
     * Gets one topic
     *
     * @param id number requested topic
     * @return OK if with topic in the body.
     */
    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getTopic(@PathVariable(name = "id") Long id) {
        LOGGER.info("Get topic with id = {}", id);
        return ok(topicService.find(id));
    }

    /**
     * Updates the topic data
     *
     * @param id    number of topic to update
     * @param topic data
     * @return BAD REQUEST if topic.id from body is not equal id or body is null or topic.id <= 0
     */
    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateTopic(@PathVariable(name = "id") Long id, @RequestBody TopicDTO topic) {
        if (topic == null || topic.id != id || topic.id <= 0) {
            LOGGER.warn("User {0} was tried to update topic with null parameters.", "MANAGER_SHOULD_BE_HERE");
            return new ResponseEntity<>(BAD_REQUEST);
        }
        Topic savedTopic = topicService.save(topic.convertToTopic());
        return ok(new TopicDTO(savedTopic));
    }

    /**
     * delete topic from DB
     *
     * @param id number of topic to be deleted
     * @return OK status
     */
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteTopic(@PathVariable(name = "id") Long id) {
        LOGGER.info("User with id = {0} was deleted topic with id = {1}", "USER_ID", id);
        topicService.delete(id);
        return new ResponseEntity<>(OK);
    }

    /**
     * Gets all topic per page
     *
     * @param pageable parameters of page
     * @return OK status and Page with TopicDTO objects
     */
    @GetMapping(path = "/all")
    public ResponseEntity<?> getAllTopic(Pageable pageable) {
        LOGGER.info("Request all topics");
        return ok(topicService.findAllDto(pageable));
    }

    @GetMapping(path = "/user")
    public ResponseEntity<?> getTopicsByUser(@RequestParam(name = "id") Long userId, Pageable pageable) {
//        if (!securityHelper.getCurrentUser().getId().equals(userId)){
//            return new ResponseEntity<>(BAD_REQUEST);
//        }
        User user = this.userService.find(userId);
        return ok(topicService.findAllTopicsByUser(userId, pageable));
    }
}
