package by.intexsoft.forum.controller;

import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.service.RoleService;
import by.intexsoft.forum.service.UserService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping(path = "/admin")
public class AdminController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(AdminController.class);

    private UserService userService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
    }

    @GetMapping(path = "/user/all")
    public ResponseEntity<?> getAllUser(Pageable pageable) {
        LOGGER.info("Get all users.");
        Page<User> users = userService.findAll(pageable);
        return new ResponseEntity<>(users, OK);
    }

    @GetMapping(path = "/user/pending")
    public ResponseEntity<?> getAllPendingUsersToApprove(Pageable pageable) {
        LOGGER.info("Get all pending users to approve.");
        Page<User> users = userService.findAllPendingToApprove(pageable);
        return new ResponseEntity<>(users, OK);
    }

    @GetMapping(path = "/user/approved")
    public ResponseEntity<?> getApprovedUsers(Pageable pageable) {
//        TODO add getCurrentUser == admin
        User admin = userService.find(2);
        LOGGER.info("User {0} trying to get all approved users.", "CURRENT_USER_VARIABLE_TO_BE_HERE");
        return ResponseEntity.ok(userService.findAllApprovedByAndNotRejected(admin, pageable));
    }

    @GetMapping(path = "/user/rejected")
    public ResponseEntity<?> getRejectedUsers(Pageable pageable) {
//        TODO add getCurrentUser == admin
        User admin = userService.find(2);
        LOGGER.info("User {0} trying to get all rejected users.", "CURRENT_USER_VARIABLE_TO_BE_HERE");
        return ResponseEntity.ok(userService.findAllApprovedByAndRejected(admin, pageable));
    }

    @GetMapping(path = "/user/blocked")
    public ResponseEntity<?> getBlockedUsers(Pageable pageable) {
//        TODO add getCurrentUser == admin
        User admin = userService.find(2);
        LOGGER.info("User {0} trying to get all blocked users.", "CURRENT_USER_VARIABLE_TO_BE_HERE");
        return ResponseEntity.ok(userService.findAllBlocked(pageable));
    }
}