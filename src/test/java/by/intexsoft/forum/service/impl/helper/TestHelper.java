package by.intexsoft.forum.service.impl.helper;

import by.intexsoft.forum.entity.Role;
import by.intexsoft.forum.entity.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.IntStream;

import static by.intexsoft.forum.service.impl.helper.role.RoleTestHelper.*;
import static java.util.stream.Collectors.toList;

public class TestHelper {
    private PasswordEncoder realPasswordEncoder;
    public static final String PASSWORD = "password";

    private List<User> users;

    public TestHelper() {
        this.realPasswordEncoder = new BCryptPasswordEncoder();
        this.users = createUsers();
        setSystemUser();
        setAdmin();
        setManager();
    }

    public List<User> getUsers() {
        return users;
    }

    public PasswordEncoder getRealPasswordEncoder() {
        return realPasswordEncoder;
    }

    public List<User> createUsers() {
        return IntStream.range(0, 11)
                .boxed()
                .map(i -> createUser(i + 1L))
                .collect(toList());
    }

    public User cloneUser(User user) {
        User clone = new User();
        clone.setId(user.getId());
        clone.hashPassword = user.hashPassword;
        clone.email = user.email;
        Role role = new Role();
        role.title = user.role.title;
        clone.role = role;
        clone.name = user.name;
        return clone;
    }

    public User createUser(Long id) {
        User user = new User();
        user.hashPassword = realPasswordEncoder.encode(PASSWORD);
        user.setId(Objects.isNull(id) ? new Date().getTime() : id);
        user.name = "name" + (id);
        user.email = "email" + (id) + "@email.com";
        user.role = USER;
        return user;
    }


    public void setSystemUser() {
        users.get(0).role = SYSTEM;
    }

    public void setAdmin() {
        users.get(1).role = ADMIN;
    }

    public void setManager() {
        users.get(2).role = MANAGER;
    }

    public User getUserByRoleTitle(String roleTitle) {
        return users.stream()
                .filter(user -> user.role.title.equalsIgnoreCase(roleTitle))
                .findFirst()
                .orElse(null);
    }

    public User findByEmail(String email) {
        return users
                .stream()
                .filter(user -> user.email.equalsIgnoreCase(email))
                .findFirst()
                .orElse(null);
    }

    public User findByUsername(String name) {
        return users
                .stream()
                .filter(user -> user.name.equals(name))
                .findFirst()
                .orElse(null);
    }

    public Pageable getPageable() {
        return new PageRequest(getPageNumber(), getPageSize());
    }

    public int getPageSize() {
        return 5;
    }

    public int getPageNumber() {
        return 0;
    }
}