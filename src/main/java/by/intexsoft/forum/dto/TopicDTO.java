package by.intexsoft.forum.dto;

import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.entity.User;

import java.sql.Timestamp;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Representation Topic to exchange between frontend and backend.
 */
public class TopicDTO {
    public Long id;
    public boolean deleted;
    public Timestamp createdAt;
    public String title;
    public Long createdById;
    public Set<Long> allowedUserIds;
    public String imagePath;
    public String description;

    public TopicDTO() {
    }

    public TopicDTO(Topic topic) {
        id = topic.getId();
        deleted = topic.deleted;
        createdAt = topic.createdAt;
        title = topic.title;
        description = topic.description;
        createdById = topic.createdBy.getId();
        imagePath = topic.imagePath;
        allowedUserIds = topic.allowedUsers
                .stream()
                .map(user -> user.getId())
                .collect(Collectors.toSet());
    }

    public Topic convertToTopic() {
        Topic topic = new Topic();
        topic.setId(id);
        topic.allowedUsers = allowedUserIds
                .stream()
                .map(userId -> {
                    User user = new User();
                    user.setId(userId);
                    return user;
                })
                .collect(Collectors.toSet());
        return topic;
    }
}
