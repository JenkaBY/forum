package by.intexsoft.forum.dto;

import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.entity.helper.Status;

public class TopicRequestDTO {
    public long id;
    public String requestedTopicTitle;
    public String requestedTopicDescription;
    public Status status;
    public String reason;
    public long requestedById;

    public TopicRequestDTO() {
    }

    public TopicRequestDTO(TopicRequest topicRequest) {
        this.id = topicRequest.getId();
        this.requestedTopicTitle = topicRequest.requestedTopicTitle;
        this.requestedTopicDescription = topicRequest.requestedTopicDescription;
        this.requestedById = topicRequest.requestedBy.getId();
        this.status = topicRequest.status;
        this.reason = topicRequest.reason;
    }
}
