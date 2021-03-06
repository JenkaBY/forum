package by.intexsoft.forum.controller;

import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.security.SecurityHelper;
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

/**
 * Controller for admin dashboard.
 */
@RestController
@RequestMapping("/admin")
public class AdminController {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(AdminController.class);

    private UserService userService;
    private SecurityHelper securityHelper;

    /**
     * @param userService    service for getting user data
     * @param securityHelper service for getting logged user
     */
    @Autowired
    public AdminController(UserService userService, SecurityHelper securityHelper) {
        this.userService = userService;
        this.securityHelper = securityHelper;
    }


    /**
     * Getting all users per page
     * @param pageable parameter for getting data per page
     * @return page of content with page parameters
     */
    @GetMapping("/user/all")
    public ResponseEntity<?> getAllUser(Pageable pageable) {
        Page<User> users = userService.findAll(pageable);
        return new ResponseEntity<>(users, OK);
    }

    /**
     * Getting all users pending to approve per page
     * @param pageable parameter for getting data per page
     * @return page of content with page parameters
     */
    @GetMapping("/user/pending")
    public ResponseEntity<?> getAllPendingUsersToApprove(Pageable pageable) {
        LOGGER.info("Get all pending users to approve. Admin id = {]", securityHelper.getCurrentUser());
        Page<User> users = userService.findAllPendingToApprove(pageable);
        return new ResponseEntity<>(users, OK);
    }

    /**
     * Gets all users a[[roved by current admin per page. Current admin data is taken from security context
     * @param pageable parameter for getting data per page
     * @return page of content with page parameters
     */
    @GetMapping("/user/approved")
    public ResponseEntity<?> getApprovedUsers(Pageable pageable) {
        User admin = securityHelper.getCurrentUser();
        LOGGER.info("User {} trying to get all approved users.", admin);
        return ResponseEntity.ok(userService.findAllApprovedByAndNotRejected(admin, pageable));
    }

    /**
     * Gets all users rejected by current admin per page. Current admin data is taken from security context
     * @param pageable parameter for getting data per page
     * @return page of content with page parameters
     */
    @GetMapping("/user/rejected")
    public ResponseEntity<?> getRejectedUsers(Pageable pageable) {
        User admin = securityHelper.getCurrentUser();
        LOGGER.info("User {} trying to get all rejected users.", admin);
        return ResponseEntity.ok(userService.findAllApprovedByAndRejected(admin, pageable));
    }

    /**
     * Gets all blocked users per page.
     * @param pageable parameter for getting data per page
     * @return page of content with page parameters
     */
    @GetMapping("/user/blocked")
    public ResponseEntity<?> getBlockedUsers(Pageable pageable) {
        User admin = securityHelper.getCurrentUser();
        LOGGER.info("User {} trying to get all blocked users.", admin);
        return ResponseEntity.ok(userService.findAllBlocked(pageable));
    }
}