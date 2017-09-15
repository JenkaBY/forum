package by.intexsoft.forum.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "messages")
public class Message extends AbstractEntity {
    public String text;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "created_by")
    public User createdBy;
}
