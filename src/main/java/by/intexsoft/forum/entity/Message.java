package by.intexsoft.forum.entity;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "messages")
public class Message extends AbstractEntity {
    @Column(nullable = false, length = 1000)
    public String text;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "created_by")
    public User createdBy;

    @Column(name = "updated_at")
    public Timestamp updatedAt;
}
