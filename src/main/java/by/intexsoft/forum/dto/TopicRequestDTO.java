package by.intexsoft.forum.dto;

import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.entity.helper.Status;

public class TopicRequestDTO {
    public long id;
    public String requestedTopicTitle;
    public String requestedTopicDescription;
    public Status status;
    public String reason;
    public User requestedBy;

    public TopicRequestDTO() {
    }

    public TopicRequestDTO(TopicRequest topicRequest) {
        this.id = topicRequest.getId();
        this.requestedTopicTitle = topicRequest.requestedTopicTitle;
        this.requestedTopicDescription = topicRequest.requestedTopicDescription;
        this.requestedBy = simplifyUser(topicRequest.requestedBy);
        this.status = topicRequest.status;
        this.reason = topicRequest.reason;
    }

//    private User convertToUser(){
//        User user = new User();
//        user.setId(id);
//        user.name=
//        return null;
//    }

    private User simplifyUser(User user) {
        User simplifiedUser = new User();
        simplifiedUser.name = user.name;
        simplifiedUser.setId(user.getId());
        return simplifiedUser;
    }
}
