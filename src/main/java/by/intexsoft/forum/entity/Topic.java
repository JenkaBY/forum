package by.intexsoft.forum.entity;

import javax.persistence.*;

import java.util.Set;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "topics")
public class Topic extends AbstractEntity{

    @Column(unique = true, nullable = false)
    public String title;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "created_by")
    public User createdBy;

    @ManyToMany(fetch = LAZY)
    @JoinTable(name = "topics_users",
            joinColumns = @JoinColumn(name = "topic_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    public Set<User> allowedUsers;
}