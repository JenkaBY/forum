package by.intexsoft.forum.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

import static javax.persistence.FetchType.*;

/**
 * TODO: rename table name
 * User class describes the 'users' table in DB.
 */
@Entity
@Table(name = "\"users_new\"")
public class UserNew extends AbstractEntity {

    private static final long serialVersionUID = 2114056750097110098L;

    @Column(name = "nickname", nullable = false, length = 127, unique = true)
    public String nickname;

    @Column(unique = true, nullable = false)
    public String email;

    @Column(name = "hash_password", nullable = false, length = 30)
    public String hashPassword;

    @Column(name = "last_logon_at", insertable = false)
    public Timestamp lastLogonAt;

    @Column(columnDefinition = "boolean default false", nullable = false, insertable = false)
    public boolean blocked;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "approved_by", insertable = false)
    public UserNew approvedBy;

    @OneToMany(mappedBy="approvedBy",fetch = LAZY)
    public Set<UserNew> approvers;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    public Role role;

}
