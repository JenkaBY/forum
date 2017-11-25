package by.intexsoft.forum.dto;

import by.intexsoft.forum.entity.Role;
import by.intexsoft.forum.entity.User;

import java.sql.Timestamp;

/**
 * Representation User to exchange between frontend and backend.
 */
public class UserDTO {
    public long id;
    public String name;
    public String email;
    public String imagePath;
    public String password;
    public Timestamp lastLogonAt;
    public boolean blocked;
    public boolean rejected;
    public Long approverId;
    public Role role;
    public Timestamp createdAt;
    public long version;

    public UserDTO() {
    }

    public UserDTO(User user) {
        id = user.getId();
        name = user.name;
        email = user.email;
        imagePath = user.imagePath;
        lastLogonAt = user.lastLogonAt;
        blocked = user.blocked;
        rejected = user.rejected;
        approverId = user.approvedBy != null ? user.approvedBy.getId() : null;
        role = user.role;
        createdAt = user.createdAt;
        version = user.version;
    }

    /**
     * Converts object to {@link User} object
     *
     * @return User instance of User class
     */
    public User transformToUser() {
        User user = new User();
        user.setId(id);
        user.name = name;
        user.email = email.toLowerCase();
        user.imagePath = imagePath;
        user.hashPassword = password;
        user.lastLogonAt = lastLogonAt;
        user.blocked = blocked;
        user.rejected = rejected;
        user.createdAt = createdAt;
        user.version = version;
        if (approverId != null) {
            user.approvedBy = new User();
            user.approvedBy.setId(approverId);
        }
        if (role != null) {
            user.role = role;
        }
        return user;
    }
}
