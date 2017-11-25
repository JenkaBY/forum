package by.intexsoft.forum.entity;

import javax.persistence.*;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;

/**
 * TopicRequest class describes the 'topic_requests' table in DB.
 * User's requests to create a topic with specified theme.
 */
@Entity
@Table(name = "topic_requests")
public class TopicRequest extends AbstractVersionEntity {
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "requested_by", updatable = false, nullable = false)
    public User requestedBy;

    @Column(name = "requested_topic_title", nullable = false)
    public String requestedTopicTitle;

    @Column(name = "requested_topic_description", length = 500)
    public String requestedTopicDescription;

    @OneToOne
    @JoinColumn(name = "created_topic_id")
    public Topic createdTopic;

    @Column(insertable = false, length = 500)
    public String reason;

    @ManyToOne(fetch = EAGER)
    @JoinColumn(name = "status_id", nullable = false)
    public Status status;
}
