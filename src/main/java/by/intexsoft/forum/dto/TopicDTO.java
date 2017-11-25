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
    public long version;

    public TopicDTO() {
    }

    /**
     * For creating from Topic object
     *
     * @param topic for which to be created topicDTO
     */
    public TopicDTO(Topic topic) {
        id = topic.getId();
        deleted = topic.deleted;
        createdAt = topic.createdAt;
        title = topic.title;
        description = topic.description;
        createdById = topic.createdBy.getId();
        imagePath = topic.imagePath;
        version = topic.version;
        allowedUserIds = topic.allowedUsers
                .stream()
                .map(user -> user.getId())
                .collect(Collectors.toSet());
    }

    /**
     * Converts instance to Topic
     * @return Topic converted Topic
     */
    public Topic convertToTopic() {
        Topic topic = new Topic();
        topic.setId(id);
        topic.description = description;
        topic.createdAt = createdAt;
        topic.createdBy = new User();
        topic.createdBy.setId(createdById);
        topic.deleted = deleted;
        topic.imagePath = imagePath;
        topic.title = title;
        topic.version = version;
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
