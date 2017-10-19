package by.intexsoft.forum.controller;

import by.intexsoft.forum.dto.UserDTO;
import by.intexsoft.forum.entity.Role;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.service.RoleService;
import by.intexsoft.forum.service.UserService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.stream.IntStream;

import static by.intexsoft.forum.security.SecurityHelper.checkPasswordLength;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private static final String INCORRECT_PASSWORD = "Incorrect Password";
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(UserController.class);

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getUserBy(@PathVariable(value = "id") Long id) {
        User user = userService.find(id);
        if (user == null) {
            LOGGER.warn("User with id = {0} is not found.", id);
            return new ResponseEntity<>("User not found.", BAD_REQUEST);
        }
        LOGGER.info("Get user by id = {0}", id);
        return new ResponseEntity<>(new UserDTO(user), OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteUserBy(@PathVariable(value = "id") Long id) {
        if (userService.find(id) == null) {
            String message = String.format("User with Id = %s doesn't exist.", id);
            LOGGER.warn(message);
            return new ResponseEntity<>(message, BAD_REQUEST);
        }
        userService.delete(id);
        LOGGER.info("User with Id={0} has been deleted.", id);
        return new ResponseEntity<>(userService.find(id).deleted ? OK : BAD_REQUEST);
    }

    @PostMapping(path = "/new")
    public ResponseEntity<?> create(@RequestBody UserDTO userDTO) {
        User createdUser = userService.save(userDTO.transformToUser());
        // TODO create case if error occurs while saving user
        LOGGER.info("New user {0} was created.", userDTO);
        return new ResponseEntity<>(new UserDTO(createdUser), CREATED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> update(@RequestBody UserDTO userDTO, @PathVariable(value = "id") Long id) {
//        TODO checking the authorities
        if (userDTO.id != id) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        User updatedUser = userService.save(userDTO.transformToUser());
        // TODO create case if error occurs while saving user
        LOGGER.info("User with id = {0} was updated.", updatedUser.getId());
        return new ResponseEntity<>(new UserDTO(updatedUser), OK);
    }

    @PutMapping(path = "/{id}/change_password")
    public ResponseEntity<?> changePassword(@PathVariable(value = "id") Long id, @RequestBody String newPassword) {
        if (!checkPasswordLength(newPassword)) {
            return new ResponseEntity<>(INCORRECT_PASSWORD, BAD_REQUEST);
        }
//        TODO add currentUser or Admin;
        User currentUser = new User();
        userService.changePassword(currentUser, newPassword);
        return new ResponseEntity<>(OK);
    }

    //    TODO Delete when all will be complete.
    @GetMapping(path = "/create")
    public ResponseEntity<?> createNewUser() {
        long date = new Date().getTime();
        User user = new User();
        user.email = date + "@email.com";
        user.hashPassword = "password";
        user.name = "User" + date;
        user.role = getRole();
        user = userService.save(user);

        LOGGER.warn("Create new user: {0}", user);
        return new ResponseEntity<>(user, CREATED);
    }

    //    TODO Remove the method. It's only for test.
    @GetMapping(path = "/create20")
    public ResponseEntity<?> create20Users() {
        IntStream.range(0, 20).forEach(number -> createNewUser());
        return ResponseEntity.ok("20 users has been created.");
    }

    //    TODO Remove the method. It's only for test.
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
