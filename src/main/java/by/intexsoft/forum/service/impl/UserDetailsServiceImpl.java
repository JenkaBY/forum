package by.intexsoft.forum.service.impl;


import by.intexsoft.forum.entity.Role;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Objects;
import java.util.Set;

import static java.lang.String.format;
import static java.util.stream.Collectors.toSet;

/**
 * Class describes implementation of {@link UserDetailsService}. It's used by Spring security for searching
 * an {@link UserDetails} by email.
 */
@Service(value = "userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {
    private static final String ROLE = "ROLE_";

    private UserService userService;

    @Autowired
    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    /**
     * Implementation of {@link UserDetailsService#loadUserByUsername(String)} method.
     *
     * @param email user email. Uses for searching an {@link UserDetails}.
     * @return {@link UserDetails} instance
     * @throws UsernameNotFoundException if user is not found in DB
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userService.getUserByEmail(email);
        if (Objects.isNull(user) || Objects.isNull(user.role)) {
            throw new UsernameNotFoundException(format("User with email = %s not found or has no Role.", email));
        }
        boolean enabled = Objects.nonNull(user.approvedBy);
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = !user.rejected;
        return new org.springframework.security.core.userdetails.User(
                user.email,
                user.hashPassword,
                enabled,
                accountNonExpired,
                credentialsNonExpired,
                accountNonLocked,
                convertToGrantAuthorities(Collections.singleton(user.role))
        );
    }

    private Set<GrantedAuthority> convertToGrantAuthorities(Set<Role> roles) {
        return roles.stream()
                .map(role -> role.title)
                .map(String::toUpperCase)
                .map(role -> ROLE + role)
                .map(SimpleGrantedAuthority::new)
                .collect(toSet());
    }
}
