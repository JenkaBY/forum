package by.intexsoft.forum.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;

/**
 * User class describes the users table in DB.
 */
@Entity
@Table(name = "users")
public class User extends AbstractEntity {

    private static final long serialVersionUID = 2114056750097110098L;

    @Column(nullable = false, length = 127, unique = true)
    public String name;

    @Column(unique = true, nullable = false)
    public String email;

    @Column(name = "hash_password", nullable = false, length = 60)
    @JsonIgnore
    public String hashPassword;

    @Column(name = "last_logon_at", insertable = false)
    public Timestamp lastLogonAt;

    @Column(columnDefinition = "boolean default false", nullable = false, insertable = false)
    public boolean blocked;

    @Column(columnDefinition = "boolean default false", nullable = false, insertable = false)
    public boolean rejected;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "approved_by", insertable = false)
    public User approvedBy;

    @ManyToOne(fetch = EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    public Role role;

    @Column(name = "image_path", insertable = false)
    public String imagePath;
}