package by.intexsoft.forum.dto;

import by.intexsoft.forum.entity.Status;
import by.intexsoft.forum.entity.TopicRequest;

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
    public long version;

    /**
     * For Jakson mapper
     */
    public TopicRequestDTO() {
    }

    /**
     * @param topicRequest
     */
    public TopicRequestDTO(TopicRequest topicRequest) {
        id = topicRequest.getId();
        requestedTopicTitle = topicRequest.requestedTopicTitle;
        requestedTopicDescription = topicRequest.requestedTopicDescription;
        requestedById = topicRequest.requestedBy.getId();
        status = topicRequest.status;
        reason = topicRequest.reason;
        version = topicRequest.version;
    }
}
