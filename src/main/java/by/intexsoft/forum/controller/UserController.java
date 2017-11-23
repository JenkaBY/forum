package by.intexsoft.forum.controller;

import by.intexsoft.forum.constant.RoleConst;
import by.intexsoft.forum.dto.ChangePassword;
import by.intexsoft.forum.dto.EntityAware;
import by.intexsoft.forum.dto.UserDTO;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.security.SecurityHelper;
import by.intexsoft.forum.service.RoleService;
import by.intexsoft.forum.service.UserService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static by.intexsoft.forum.security.SecurityHelper.checkPasswordLength;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.ok;

/**
 * Controller for managing the users
 */
@RestController
@RequestMapping("/user")
public class UserController {
    private static final String INCORRECT_PASSWORD = "Incorrect Password length";
    private static final String INCORRECT_CURRENT_PASSWORD = "Incorrect Current Password";
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(UserController.class);

    private UserService userService;
    private RoleService roleService;
    private SecurityHelper securityHelper;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, RoleService roleService, SecurityHelper securityHelper, PasswordEncoder encoder) {
        this.userService = userService;
        this.roleService = roleService;
        this.securityHelper = securityHelper;
        this.passwordEncoder = encoder;
    }

    /**
     * gets user data by id given in request
     * @param id id number of user
     * @return BAD_REQUEST if user not found or OK with userData in Body.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserBy(@PathVariable long id) {
        User user = userService.find(id);
        if (Objects.isNull(user)) {
            LOGGER.warn("User with id = {} is not found.", id);
            return new ResponseEntity<>(BAD_REQUEST);
        }
        LOGGER.info("Get user by id = {}", id);
        return new ResponseEntity<>(new UserDTO(user), OK);
    }


    /**
     * Delete user by id
     * @param id id number of user
     * @return BAD_REQUEST if user not found or user is not deleted.
     * OK if user has been deleted.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserBy(@PathVariable long id) {
        User currentUser = securityHelper.getCurrentUser();
        User foundUser = userService.find(id);
        if (Objects.isNull(foundUser)) {
            String message = String.format("User with Id = %s doesn't exist.", id);
            LOGGER.warn(message);
            return new ResponseEntity<>(BAD_REQUEST);
        }
        if (foundUser.role.title.equalsIgnoreCase(RoleConst.SYSTEM)) {
            LOGGER.warn("The attempt to delete SYSTEM user by user id={} was.", currentUser.getId());
            return new ResponseEntity<>(BAD_REQUEST);
        }
        userService.delete(id);
        LOGGER.info("User with Id={} has been deleted.", id);
        return new ResponseEntity<>(Objects.isNull(userService.find(id)) ? NO_CONTENT : BAD_REQUEST);
    }

    /**
     * Creates new user.
     * @param userDTO user's data(password email and name) to be created
     * @return created user data with OK status.
     */
    @PostMapping(path = "/new")
    public ResponseEntity<?> create(@RequestBody UserDTO userDTO) {
        User createdUser = userService.save(userDTO.transformToUser());
        LOGGER.info("New user id={} was created.", userDTO.id);
        return new ResponseEntity<>(new UserDTO(createdUser), CREATED);
    }

    /**
     * updates the user
     * @param userDTO user data that to be updated.
     * @param id id of updated user
     * @return BAD REQUEST if ids doesn't match
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody UserDTO userDTO, @PathVariable long id) {
        if (userDTO.id != id) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        if (userDTO.role.title.equalsIgnoreCase(RoleConst.SYSTEM)) {
            LOGGER.warn("Attempt to update the SYSTEM user id={}", id);
            return new ResponseEntity<>(BAD_REQUEST);
        }
        User updatedUser = userService.save(userDTO.transformToUser());
        LOGGER.info("User with id = {} was updated.", updatedUser.getId());
        return new ResponseEntity<>(new UserDTO(updatedUser), OK);
    }

    /**
     * Changes password for user with id given in request parameters. UserData is taken from Security context.
     * @param passwords object ChangePassword with raw new password and raw Current password
     * @return BAD REQUEST if password is incorrect. Or OK if password has been updated.
     */
    @PutMapping("/change_password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePassword passwords) {
        if (!checkPasswordLength(passwords.newPassword)) {
            return new ResponseEntity<>(INCORRECT_PASSWORD, BAD_REQUEST);
        }
        User currentUser = securityHelper.getCurrentUser();
        if (!passwordEncoder.matches(passwords.currentPassword, currentUser.hashPassword)) {
            return new ResponseEntity<>(INCORRECT_CURRENT_PASSWORD, BAD_REQUEST);
        }
        userService.changePassword(currentUser, passwords.newPassword);
        return new ResponseEntity<>(NO_CONTENT);
    }

    /**
     * Gets all users by lists in requested params
     * @param userIds ids of users
     * @return Response with list of UserDTO objects and Response Status OK.
     */
    @GetMapping
    public ResponseEntity<?> getAllUserByIds(@RequestParam("ids") Set<Long> userIds) {
        LOGGER.info("Get all users by ids {}.", userIds);
        Set<User> users = userService.findAllUsersByIds(userIds);
        return new ResponseEntity<>(
                users.stream()
                        .map(user -> new UserDTO(user))
                        .collect(Collectors.toSet()),
                OK);
    }

    /**
     * Checks is email exist in DB.
     * @param email that to be checked.  Parameter in query string
     * @return {@link EntityAware} object in all cases
     */
    @GetMapping("/check_email")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        if (Objects.isNull(email) || email.isEmpty()) {
            return ok(new EntityAware());
        }
        User foundUser = userService.getUserByEmail(email);
        if (Objects.isNull(foundUser)) {
            return ok(new EntityAware());
        }
        return ok(new EntityAware(true));
    }

    /**
     * Checks is name exist in DB.
     * @param name that to be checked. Parameter in query string
     * @return {@link EntityAware} object in all cases
     */
    @GetMapping("/check_name")
    public ResponseEntity<?> getUserByName(@RequestParam String name) {
        if (Objects.isNull(name) || name.isEmpty()) {
            return ok(new EntityAware());
        }
        User foundUser = userService.getUserByUsername(name);
        if (Objects.isNull(foundUser)) {
            return ok(new EntityAware());
        }
        return ok(new EntityAware(true));
    }
}