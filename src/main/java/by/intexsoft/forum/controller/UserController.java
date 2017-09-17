package by.intexsoft.forum.controller;

import by.intexsoft.forum.entity.Role;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.service.RoleService;
import by.intexsoft.forum.service.UserService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(UserController.class);

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @RequestMapping(path = "/all")
    public ResponseEntity<?> getAll() {
        LOGGER.warn("Get all users");
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, OK);
    }

    @RequestMapping(path = "/{id}")
    public ResponseEntity<?> getUserBy(@PathVariable(value = "id") Integer id) {
        User user = userService.find(id);
        if (user == null) {
            LOGGER.warn("User with id = {0} is not found.", id);
            return new ResponseEntity<>("User not found", BAD_REQUEST);
        }
        LOGGER.info("Get user by id = {0}", id);
        return new ResponseEntity<>(user, OK);
    }

    @RequestMapping(path = "/{id}", method = DELETE)
    public ResponseEntity<?> deleteUserBy(@PathVariable(value = "id") Integer id) {
        if (userService.find(id) == null) {
            String message = String.format("User with Id = %s doen't exist.", id);
            LOGGER.warn(message);
            return new ResponseEntity<>(message, BAD_REQUEST);
        }
        userService.delete(id);
        LOGGER.info("User with Id={0} haas been deleted.", id);
        return new ResponseEntity<>(userService.find(id) == null ? OK : BAD_REQUEST);
    }

    @RequestMapping(path = "/new", method = POST)
    public ResponseEntity<?> create(@RequestBody User user) {
        User createdUser = userService.save(user);
        // TODO create case if error occurs while saving user
        LOGGER.info("New user {0} was created.", user);
        return new ResponseEntity<>(createdUser, CREATED);
    }

    @RequestMapping(path = "/{id}", method = PUT)
    public ResponseEntity<?> update(@RequestBody User user) {
        User updatedUser = userService.save(user);
        // TODO create case if error occurs while saving user
        LOGGER.info("User with id = {0} was updated.", user.getId());
        return new ResponseEntity<>(updatedUser, OK);
    }

    @RequestMapping(path = "/create")
    public ResponseEntity<?> createNewUser() {
        long date = new Date().getTime();
        User user = new User();
        user.blocked = false;
        user.deleted = false;
        user.email = date + "@email.com";
        user.hashPassword = "password";
        user.name = "User" + date;
        user.role = getRole();
        user = userService.save(user);

        LOGGER.warn("Create new user: {0}", user);
        return new ResponseEntity<>(user, CREATED);
    }

    private Role getRole() {
        Role role = roleService.find(1);
        if (role == null) {
            role = new Role();
            role.title = "USER";
            roleService.save(role);
        }
        return role;
    }
}
