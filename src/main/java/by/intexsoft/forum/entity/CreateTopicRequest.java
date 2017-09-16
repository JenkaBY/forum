package by.intexsoft.forum.entity;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;


/**
 * CreateTopicRequest class describes the 'create_topic_requests' table in DB.
 */
@Entity
@Table(name = "create_topic_requests")
public class CreateTopicRequest extends AbstractEntity {
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "requested_by", updatable = false, nullable = false)
    public UserNew requestedBy;

    @Column(name = "requested_topic_title", updatable = false, nullable = false)
    public String requestedTopicTitle;

    @OneToOne
    @JoinColumn(name = "created_topic_id")
    public Topic createdTopic;
}
