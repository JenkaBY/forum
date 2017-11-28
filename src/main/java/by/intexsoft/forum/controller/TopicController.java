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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.ResponseEntity.ok;

/**
 * Controller for manage the topics
 */
@RestController
@RequestMapping("/topic")
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
     * Gets one topic
     * @param id number requested topic
     * @return OK if with topic in the body.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getTopic(@PathVariable long id) {
        LOGGER.info("Get topic with id = {}", id);
        Topic topic = topicService.find(id);
        if (Objects.isNull(topic)) {
            LOGGER.warn("Attempt to get non existing topic id={}.", id);
            return new ResponseEntity<>(BAD_REQUEST);
        }
        return ok(new TopicDTO(topic));
    }

    /**
     * Updates the topic data
     * @param id    number of topic to update
     * @param topic data
     * @return BAD REQUEST if topic.id from body is not equal id or body is null or topic.id <= 0
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTopic(@PathVariable long id, @RequestBody TopicDTO topic) {
        User currentUser = securityHelper.getCurrentUser();
        if (topic == null || !topic.id.equals(id)) {
            LOGGER.warn("User {} was tried to update topic with null parameters.", currentUser);
            return new ResponseEntity<>(BAD_REQUEST);
        }
        Topic savedTopic = topicService.save(topic.convertToTopic());
        return ok(new TopicDTO(savedTopic));
    }

    /**
     * delete topic from DB
     * @param id number of topic to be deleted
     * @return OK status
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTopic(@PathVariable long id) {
        User loggedUser = securityHelper.getCurrentUser();
        topicService.delete(id);
        if (Objects.nonNull(topicService.find(id))) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        LOGGER.info("User with id = {} was deleted topic with id = {}", loggedUser.getId(), id);
        return new ResponseEntity<>(NO_CONTENT);
    }

    /**
     * Gets all topic per page
     *
     * @param pageable parameters of page
     * @return OK status and Page with TopicDTO objects
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllTopic(@RequestParam(required = false) String title, Pageable pageable) {
        if (Objects.nonNull(title) && !title.isEmpty()) {
            Page<TopicDTO> topics = topicService.findAllByTopicTitle(title, pageable);
            return ok(topics);
        }
        return ok(topicService.findAllDto(pageable));
    }

    /**
     * Gets all topics by user's ID per page.
     *
     * @param userId   request parameter. Id of user needed to get all topics
     * @param pageable parameter of page request
     * @return page object with content and page parameters of topics
     */
    @GetMapping("/user")
    public ResponseEntity<?> getTopicsByUserId(@RequestParam("id") long userId, Pageable pageable) {
        return ok(topicService.findAllTopicsDtoByUserId(userId, pageable));
    }
}
