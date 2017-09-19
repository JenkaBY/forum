package by.intexsoft.forum.controller;

import by.intexsoft.forum.service.TopicRequestService;
import by.intexsoft.forum.service.TopicService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

}
