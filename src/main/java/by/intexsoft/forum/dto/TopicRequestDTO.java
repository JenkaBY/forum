package by.intexsoft.forum.dto;

import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.entity.helper.Status;

/**
 * Representation TopicRequest to exchange between frontend and backend.
 */
public class TopicRequestDTO {
    public long id;
    public String requestedTopicTitle;
    public String requestedTopicDescription;
    public Status status;
    public String reason;
    public long requestedById;

    /**
     * For Jakson mapper
     */
    public TopicRequestDTO() {
    }

    /**
     * @param topicRequest
     */
    public TopicRequestDTO(TopicRequest topicRequest) {
        this.id = topicRequest.getId();
        this.requestedTopicTitle = topicRequest.requestedTopicTitle;
        this.requestedTopicDescription = topicRequest.requestedTopicDescription;
        this.requestedById = topicRequest.requestedBy.getId();
        this.status = topicRequest.status;
        this.reason = topicRequest.reason;
    }
}
