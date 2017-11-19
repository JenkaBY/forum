package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.constant.RoleConst;
import by.intexsoft.forum.entity.Role;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.repository.UserRepository;
import by.intexsoft.forum.service.RoleService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Objects;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.toList;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceImplTest {

    private PasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Mock
    private RoleService roleService;
    @Mock
    private UserRepository repository;
    @InjectMocks
    private UserServiceImpl userService;

    private List<User> users;
    private Pageable pageable;
    private String rawPassword = "password";

    @Before
    public void setUp() throws Exception {
        users = createUsers();
        pageable = this.getPageable();
        setSystemUser();
        setAdmin();
        setManager();
    }

    @After
    public void tearDown() throws Exception {
        users = null;
        pageable = null;
    }

    @Test
    public void findAll() throws Exception {
        when(repository.findAll(pageable)).thenReturn(getPageUsers());
        assertEquals(userService.findAll(pageable).getContent().size(), getPageSize());
    }

    @Test
    public void findAllPendingToApprove() throws Exception {
        approve3users();
        when(repository.findByApprovedByIsNullAndRejectedIsFalse(pageable)).thenReturn(pendingToApproveUsers());
        assertEquals(userService.findAllPendingToApprove(getPageable()).getContent().size(), countNonApprovedUser());
    }

    @Test
    public void findAllApprovedByAndNotRejected() throws Exception {
        approve3users();
        User manager = getUserByRoleTitle(RoleConst.MANAGER);
        when(repository.findByApprovedByAndRejectedFalse(manager, pageable)).thenReturn(approvedUsers(manager));
        assertEquals(userService.findAllApprovedByAndNotRejected(manager, getPageable())
                .getContent().size(), countApprovedUserByManager(manager));
    }

    @Test
    public void findAllApprovedByAndRejected() throws Exception {
        reject3users();
        User manager = getUserByRoleTitle(RoleConst.MANAGER);
        when(repository.findByApprovedByIsNullAndRejectedIsFalse(pageable)).thenReturn(rejectedUsers(manager));
        assertEquals(userService.findAllPendingToApprove(getPageable()).getContent().size(), countRejectedUser(manager));
    }

    @Test
    public void findAllBlocked() throws Exception {
        block4users();
        when(repository.findByBlockedTrue(getPageable())).thenReturn(blockedUsers());
        assertEquals(countBlockedUser(), userService.findAllBlocked(getPageable()).getContent().size());
    }

    @Test
    public void save() throws Exception {
    }

    @Test
    public void changePassword() throws Exception {
    }

    @Test
    public void isEmailExist() throws Exception {
    }

    @Test
    public void isNameExist() throws Exception {
    }

    @Test
    public void getUserByEmail() throws Exception {
    }

    @Test
    public void findAllUsersByIds() throws Exception {
    }

    @Test
    public void getUserByUsername() throws Exception {
    }

    private List<User> createUsers() {
        return IntStream.range(0, 11)
                .boxed()
                .map(i -> {
                    User user = new User();
                    user.setId(i + 1);
                    user.hashPassword = bCryptPasswordEncoder.encode(rawPassword);
                    user.name = "name" + (i + 1);
                    user.email = "email" + (i + 1) + "@email";
                    Role userRole = new Role();
                    userRole.title = RoleConst.USER;
                    user.role = userRole;
                    return user;
                })
                .collect(toList());

    }

    private Page<User> getPageUsers() {
        return new PageImpl<>(
                users.stream()
                        .limit(getPageSize())
                        .collect(toList()),
                getPageable(),
                users.size()
        );
    }

    private Pageable getPageable() {
        return new PageRequest(getPageNumber(), getPageSize());
    }

    private int getPageSize() {
        return 5;
    }

    private int getPageNumber() {
        return 0;
    }

    private void approve3users() {
        users = users.stream()
                .map(user -> {
                    System.out.println("user.getId()" + (user.getId() - 1) + " users.size() - getSizeApprovedUsers() " + (users.size()) + " - " + getSizeApprovedUsers() + "+" + 7);
                    if (user.getId() > users.size() - getSizeApprovedUsers()) {
                        user.approvedBy = getUserByRoleTitle(RoleConst.MANAGER);
                    }
                    return user;
                })
                .collect(toList());
    }

    private void reject3users() {
        users = users.stream()
                .map(user -> {
                    if (user.getId() > users.size() - getSizeApprovedUsers()) {
                        user.approvedBy = getUserByRoleTitle(RoleConst.MANAGER);
                        user.rejected = true;
                    }
                    return user;
                })
                .collect(toList());
    }

    private void block4users() {
        users = users.stream()
                .map(user -> {
                    if (user.getId() > users.size() - 4) {
                        user.blocked = true;
                    }
                    return user;
                })
                .collect(toList());
    }

    private Page<User> blockedUsers() {
        return new PageImpl<>(
                users.stream()
                        .filter(user -> user.blocked)
                        .collect(toList()),
                getPageable(),
                countBlockedUser());
    }

    private Page<User> pendingToApproveUsers() {
        return new PageImpl<>(
                users.stream()
                        .filter(user -> Objects.isNull(user.approvedBy))
                        .collect(toList()),
                getPageable(),
                countNonApprovedUser());
    }

    private Page<User> approvedUsers(User manager) {
        return new PageImpl<>(
                users.stream()
                        .filter(user -> Objects.nonNull(user.approvedBy) && user.approvedBy.equals(manager))
                        .collect(toList()),
                getPageable(),
                countApprovedUserByManager(manager));
    }

    private Page<User> rejectedUsers(User manager) {
        return new PageImpl<>(
                users.stream()
                        .filter(user -> user.rejected && user.approvedBy.equals(manager))
                        .collect(toList()),
                getPageable(),
                countRejectedUser(manager));
    }

    private int getSizeApprovedUsers() {
        return 3;
    }

    private long countRejectedUser(User manager) {
        return users.stream()
                .filter(user -> user.rejected && user.approvedBy.equals(manager))
                .collect(toList())
                .size();
    }

    private long countNonApprovedUser() {
        return users.stream()
                .filter(user -> Objects.isNull(user.approvedBy))
                .collect(toList())
                .size();
    }

    private long countApprovedUserByManager(User manager) {
        return users.stream()
                .filter(user -> Objects.nonNull(user.approvedBy) && user.approvedBy.equals(manager))
                .collect(toList())
                .size();
    }

    private long countBlockedUser() {
        return users.stream()
                .filter(user -> user.blocked)
                .collect(toList())
                .size();
    }

    private void setSystemUser() {
        Role system = new Role();
        system.title = RoleConst.SYSTEM;
        users.get(0).role = system;
    }

    private void setAdmin() {
        Role admin = new Role();
        admin.title = RoleConst.ADMIN;
        users.get(1).role = admin;
    }

    private void setManager() {
        Role role = new Role();
        role.title = RoleConst.MANAGER;
        users.get(2).role = role;
    }

    private User getUserByRoleTitle(String roleTitle) {
        return users.stream()
                .filter(user -> user.role.title.equalsIgnoreCase(roleTitle))
                .findFirst()
                .get();
    }
}