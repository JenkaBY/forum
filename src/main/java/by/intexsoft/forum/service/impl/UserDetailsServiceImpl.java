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
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@Service(value = "userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

    public static final String ROLE = "ROLE_";

    private UserService userService;

    @Autowired
    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userService.getUserByEmail(email);
        return new org.springframework.security.core.userdetails.User(
                user.email,
                user.hashPassword,
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
