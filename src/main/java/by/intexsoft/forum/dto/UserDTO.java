package by.intexsoft.forum.dto;

import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.service.RoleService;
import by.intexsoft.forum.service.UserService;

import java.sql.Timestamp;

public class UserDTO {
    public long id;
    public String name;
    public String email;
    public String password;
    public Timestamp lastLogonAt;
    public boolean blocked;
    public boolean rejected;
    public Long approver_id;
    public long role_id;
    public Timestamp createdAt;

    public UserDTO(User user) {
        id = user.getId();
        name = user.name;
        email = user.email;
        lastLogonAt = user.lastLogonAt;
        blocked = user.blocked;
        rejected = user.rejected;
        approver_id = user.approvedBy.getId();
        role_id = user.role.getId();
        createdAt = user.createdAt;
    }

    public User transformToUser(UserService userService, RoleService roleService) {
        User user = new User();
        user.setId(id);
        user.name = name;
        user.email = email;
        user.lastLogonAt = lastLogonAt;
        user.blocked = blocked;
        user.rejected = rejected;
        user.createdAt = createdAt;
        user.approvedBy = userService.find(id);
        user.role = roleService.find(role_id);
        return user;
    }
}
