package by.intexsoft.forum.entity;

import javax.persistence.*;
import java.util.Set;

import static javax.persistence.FetchType.LAZY;

/**
 * Topic class describes the 'topics' table in DB.
 */
@Entity
@Table(name = "topics")
public class Topic extends AbstractVersionEntity {

    @Column(unique = true, nullable = false)
    public String title;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "created_by", updatable = false)
    public User createdBy;

    @ManyToMany(fetch = LAZY)
    @JoinTable(name = "topics_users",
            joinColumns = @JoinColumn(name = "topic_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    public Set<User> allowedUsers;

    @Column(name = "image_path")
    public String imagePath;

    @Column(length = 500)
    public String description;

    /**
     * Removes allowed user from list allowedUser
     *
     * @param user to be removed
     * @return {@code true} if user was removed
     */
    public boolean removeAllowedUser(User user) {
        return allowedUsers.removeIf(
                user1 -> user1.getId().equals(user.getId())
        );
    }
}
