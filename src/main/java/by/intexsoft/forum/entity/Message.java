package by.intexsoft.forum.entity;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.FetchType.LAZY;

/**
 * Message class describes the 'messages' table in DB.
 */
@Entity
@Table(name = "messages")
public class Message extends AbstractVersionEntity {
    @Column(nullable = false, length = 5000)
    public String text;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "created_by", updatable = false)
    public User createdBy;

    @Column(name = "updated_at")
    public Timestamp updatedAt;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "updated_by")
    public User updatedBy;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "topic_id", updatable = false, nullable = false)
    public Topic inTopic;
}
