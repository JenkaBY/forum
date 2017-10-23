package by.intexsoft.forum.entity;

import by.intexsoft.forum.entity.helper.Status;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "topic_discuss_requests")
public class TopicDiscussRequest extends AbstractEntity {
    private static final long serialVersionUID = 2114056750097120018L;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id", updatable = false, nullable = false)
    public User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "approved_by", insertable = false)
    public User approvedBy;

    @Column(name = "approved_at", insertable = false)
    public Timestamp approvedAt;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "topic_id", updatable = false)
    public Topic topic;

    @Enumerated(STRING)
    @Column(length = 10)
    public Status status;
}
