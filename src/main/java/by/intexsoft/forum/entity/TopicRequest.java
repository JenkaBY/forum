package by.intexsoft.forum.entity;

import by.intexsoft.forum.entity.helper.Status;

import javax.persistence.*;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;

/**
 * TopicRequest class describes the 'topic_requests' table in DB.
 * User's requests to create a topic with specified theme/
 */
@Entity
@Table(name = "topic_requests")
public class TopicRequest extends AbstractEntity {
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "requested_by", updatable = false, nullable = false)
    public User requestedBy;

    @Column(name = "requested_topic_title", updatable = false, nullable = false)
    public String requestedTopicTitle;

    @OneToOne
    @JoinColumn(name = "created_topic_id")
    public Topic createdTopic;

    @Enumerated(STRING)
    public Status status;

    @Column(insertable = false, length = 500)
    public String reason;
}
