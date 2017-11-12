package by.intexsoft.forum.controller;

import by.intexsoft.forum.constant.RoleConst;
import by.intexsoft.forum.dto.UserDTO;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.security.SecurityHelper;
import by.intexsoft.forum.service.RoleService;
import by.intexsoft.forum.service.UserService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Set;

import static by.intexsoft.forum.security.SecurityHelper.checkPasswordLength;
import static org.springframework.http.HttpStatus.*;

/**
 * Controller for managing the users
 */
@RestController
@RequestMapping("/user")
public class UserController {
    private static final String INCORRECT_PASSWORD = "Incorrect Password";
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(UserController.class);

    private UserService userService;
    private RoleService roleService;
    private SecurityHelper securityHelper;

    @Autowired
    public UserController(UserService userService, RoleService roleService, SecurityHelper securityHelper) {
        this.userService = userService;
        this.roleService = roleService;
        this.securityHelper = securityHelper;
    }

    /**
     * gets user data by id given in request
     *
     * @param id id number of user
     * @return BAD_REQUEST if user not found or OK with userData in Body.
     */
    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getUserBy(@PathVariable(value = "id") Long id) {
        User user = userService.find(id);
        if (user == null) {
            LOGGER.warn("User with id = {} is not found.", id);
            return new ResponseEntity<>("User not found.", BAD_REQUEST);
        }
        LOGGER.info("Get user by id = {}", id);
        return new ResponseEntity<>(new UserDTO(user), OK);
    }


    /**
     * Delete user by id
     *
     * @param id id number of user
     * @return BAD_REQUEST if user not found or user is not deleted.
     * OK if user has been deleted.
     */
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteUserBy(@PathVariable(value = "id") Long id) {
        User foundUser = userService.find(id);
        if (Objects.isNull(foundUser)) {
            String message = String.format("User with Id = %s doesn't exist.", id);
            LOGGER.warn(message);
            return new ResponseEntity<>(message, BAD_REQUEST);
        }
        if (foundUser.role.title.compareToIgnoreCase(RoleConst.SYSTEM) == 0) {
            LOGGER.warn("Was attempt to delete SYSTEM user");
            return new ResponseEntity<>(BAD_REQUEST);
        }
        userService.delete(id);
        LOGGER.info("User with Id={} has been deleted.", id);
        return new ResponseEntity<>(Objects.isNull(userService.find(id)) ? OK : BAD_REQUEST);
    }

    /**
     * Creates new user.
     *
     * @param userDTO user data(password email and name) to be created
     * @return created user data with OK status.
     */
    @PostMapping(path = "/new")
    public ResponseEntity<?> create(@RequestBody UserDTO userDTO) {
        User createdUser = userService.save(userDTO.transformToUser());
        // TODO create case if error occurs while saving user
        LOGGER.info("New user id={} was created.", userDTO.id);
        return new ResponseEntity<>(new UserDTO(createdUser), CREATED);
    }

    /**
     * updates the user
     * @param userDTO user data that to be updated.
     * @param id id of updated user
     * @return BAD REQUEST if ids doesn't match
     */
    @PutMapping(path = "/{id}")
    public ResponseEntity<?> update(@RequestBody UserDTO userDTO, @PathVariable(value = "id") Long id) {
        if (userDTO.id != id) {
            return new ResponseEntity<>(BAD_REQUEST);
        }
        if (userDTO.role.title.compareToIgnoreCase(RoleConst.SYSTEM) == 0) {
            LOGGER.warn("Was attempt to update the SYSTEM user id={}", id);
            return new ResponseEntity<>(BAD_REQUEST);
        }
        User updatedUser = userService.save(userDTO.transformToUser());
        LOGGER.info("User with id = {} was updated.", updatedUser.getId());
        return new ResponseEntity<>(new UserDTO(updatedUser), OK);
    }

    /**
     * Changes password for user with id given in request parameters. UserData is taken from Security context.
     * @param id id number of user for which password to be updated
     * @param newPassword raw password string
     * @return BAD REQUEST if password is incorrect. Or OK if password has been updated.
     */
    @PutMapping(path = "/{id}/change_password")
    public ResponseEntity<?> changePassword(@PathVariable(value = "id") Long id, @RequestBody String newPassword) {
        if (!checkPasswordLength(newPassword)) {
            return new ResponseEntity<>(INCORRECT_PASSWORD, BAD_REQUEST);
        }
        User currentUser = securityHelper.getCurrentUser();
        userService.changePassword(currentUser, newPassword);
        return new ResponseEntity<>("{}", OK);
    }


    @GetMapping
    public ResponseEntity<?> getAllUserByIds(@RequestParam(name = "ids") Set<Long> userIds) {
        LOGGER.info("Get all users by ids {}.", userIds);
        Set<User> users = userService.findAllUsersByIds(userIds);
        return new ResponseEntity<>(users, OK);
    }
}