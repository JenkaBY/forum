package by.intexsoft.forum.security;

import by.intexsoft.forum.constant.Validation;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Objects;

/**
 * Utility class for Spring Security.
 */
@Service
public final class SecurityHelper {
    private UserService userService;

    @Autowired
    public SecurityHelper(UserService userService) {
        this.userService = userService;
    }

    /**
     * Checking password length
     *
     * @param password raw password string
     * @return true if password length is more or equals Validation.MIN_PASSWORD_LENGTH
     * and less or equals Validation.MAX_PASSWORD_LENGTH
     */
    public static boolean checkPasswordLength(String password) {
        return password.length() >= Validation.MIN_PASSWORD_LENGTH
                && password.length() <= Validation.MAX_PASSWORD_LENGTH;
    }

    /**
     * Get the the current user or null.
     *
     * @return current user or null
     */
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String email = null;
            if (authentication.getPrincipal() instanceof UserDetails) {
                UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
                email = springSecurityUser.getUsername();
            } else if (authentication.getPrincipal() instanceof String) {
                email = (String) authentication.getPrincipal();
            }
            if (Objects.nonNull(email)) {
                return userService.getUserByEmail(email);
            }
        }
        return null;
    }
}

