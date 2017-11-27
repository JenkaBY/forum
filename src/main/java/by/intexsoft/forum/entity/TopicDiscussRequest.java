package by.intexsoft.forum.entity;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;

/**
 * Describes 'topic_discuss_requests' table in DB
 */
@Entity
@Table(name = "topic_discuss_requests")
public class TopicDiscussRequest extends AbstractVersionEntity {
    private static final long serialVersionUID = 2114056750097120018L;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "requested_by", updatable = false, nullable = false)
    public User requestedBy;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "approved_by", insertable = false)
    public User approvedBy;

    @Column(name = "approved_at", insertable = false)
    public Timestamp approvedAt;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "topic_id", updatable = false)
    public Topic inTopic;

    @ManyToOne(fetch = EAGER)
    @JoinColumn(name = "status_id", nullable = false)
    public Status status;
}
