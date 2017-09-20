package by.intexsoft.forum.entity;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.FetchType.LAZY;

/**
 * TODO: rename table name
 * User class describes the 'users' table in DB.
 */
@Entity
@Table(name = "\"users\"")
public class User extends AbstractEntity {

    private static final long serialVersionUID = 2114056750097110098L;

    @Column(name = "name", nullable = false, length = 127, unique = true)
    public String name;

    @Column(unique = true, nullable = false)
    public String email;

    @Column(name = "hash_password", nullable = false, length = 60)
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

//    TODO Need to check how it works.
//    @OneToMany(mappedBy="approvedBy",fetch = LAZY)
//    @Transient
//    public Set<User> approvers;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    public Role role;
}