package by.intexsoft.forum.dto;

import by.intexsoft.forum.entity.Role;
import by.intexsoft.forum.entity.User;

import java.sql.Timestamp;

public class UserDTO {
    public long id;
    public String name;
    public String email;
    public String imagePath;
    public String password;
    public Timestamp lastLogonAt;
    public boolean blocked;
    public boolean rejected;
    public Long approver_id;
    public Role role;
    public Timestamp createdAt;

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
        approver_id = user.approvedBy != null ? user.approvedBy.getId() : null;
        role = user.role;
        createdAt = user.createdAt;
    }

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
        if (approver_id != null) {
            user.approvedBy = new User();
            user.approvedBy.setId(approver_id);
        }
        if (role != null) {
            user.role = role;
        }
        return user;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", blocked=" + blocked +
                ", rejected=" + rejected +
                ", approver_id=" + approver_id +
                ", role_id=" + (role != null ? role.getId() : "null") +
                ", createdAt=" + createdAt +
                '}';
    }
}
