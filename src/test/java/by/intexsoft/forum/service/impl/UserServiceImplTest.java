package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.constant.RoleConst;
import by.intexsoft.forum.entity.Role;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.repository.UserRepository;
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

import java.util.*;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.toList;
import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceImplTest {

    private PasswordEncoder realPasswordEncoder = new BCryptPasswordEncoder();
    @Mock
    private PasswordEncoder bCryptPasswordEncoder;
    @Mock
    private UserRepository repository;
    @InjectMocks
    private UserServiceImpl userService;

    private List<User> users;
    private Pageable pageable;

    @Before
    public void setUp() throws Exception {
        users = createUsers();
        pageable = getPageable();
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
        assertEquals("Contains the " + getPageSize() + " users", userService.findAll(pageable).getContent().size(), getPageSize());
        users = new ArrayList<>();
        when(repository.findAll(pageable)).thenReturn(getPageUsers());
        assertEquals("Contains the " + 0 + " users", userService.findAll(pageable).getContent().size(), 0);
    }

    @Test
    public void findAllPendingToApprove() throws Exception {
        approve3users();
        when(repository.findByApprovedByIsNullAndRejectedIsFalse(pageable)).thenReturn(pendingToApproveUsers());
        assertEquals("Contains the " + countNonApprovedUser() + " users", userService.findAllPendingToApprove(getPageable()).getContent().size(), countNonApprovedUser());
    }

    @Test
    public void findAllApprovedByAndNotRejected() throws Exception {
        approve3users();
        User manager = getUserByRoleTitle(RoleConst.MANAGER);
        when(repository.findByApprovedByAndRejectedFalse(manager, pageable)).thenReturn(approvedUsers(manager));
        assertEquals("Contains the " + countNonApprovedUser() + " users", userService.findAllApprovedByAndNotRejected(manager, pageable)
                .getContent().size(), countApprovedUserByManager(manager));
    }

    @Test
    public void findAllApprovedByAndRejected() throws Exception {
        reject3users();
        User manager = getUserByRoleTitle(RoleConst.MANAGER);
        when(repository.findByApprovedByIsNullAndRejectedIsFalse(pageable)).thenReturn(rejectedUsers(manager));
        assertEquals(userService.findAllPendingToApprove(pageable).getContent().size(), countRejectedUser(manager));
    }

    @Test
    public void findAllBlocked() throws Exception {
        block4users();
        when(repository.findByBlockedTrue(getPageable())).thenReturn(blockedUsers());
        assertEquals(countBlockedUser(), userService.findAllBlocked(getPageable()).getContent().size());
    }

    @Test
    public void save() throws Exception {
        User newUser = createUser(null);
        newUser.setId(users.size());
        User savedUser = cloneUser(newUser);
        savedUser.setId(users.size());
        when(repository.save(newUser)).thenReturn(savedUser);
        assertEquals("new user have to id after save", userService.save(newUser), savedUser);

        User updatedUser = cloneUser(savedUser);
        updatedUser.name = "updated";
        when(repository.save(savedUser)).thenReturn(updatedUser);
        assertEquals("name should be updated", userService.save(savedUser).name, updatedUser.name);
    }

    @Test
    public void changePassword() throws Exception {
        String newPassword = "newPassword";
        User user = users.get(0);
        User clone = cloneUser(user);
        clone.hashPassword = realPasswordEncoder.encode(newPassword);
        when(bCryptPasswordEncoder.encode(newPassword)).thenReturn(realPasswordEncoder.encode(newPassword));
        when(repository.save(user)).thenReturn(clone);
        userService.changePassword(user, newPassword);
        assertTrue("New password to be saved", realPasswordEncoder.matches(newPassword, user.hashPassword));
    }

    @Test
    public void isEmailExist() throws Exception {
        String email = users.get(0).email;
        when(userService.getUserByEmail(email)).thenReturn(findByEmail(email));
        assertTrue("To be found user", userService.isEmailExist(email));

        String nonExistingEmail = "Email@email.test";
        when(userService.getUserByEmail(nonExistingEmail)).thenReturn(findByEmail(nonExistingEmail));
        assertTrue("To be NOT found user", !userService.isEmailExist(nonExistingEmail));
    }

    @Test
    public void isNameExist() throws Exception {
        String name = users.get(0).name;
        when(userService.getUserByUsername(name)).thenReturn(findByUsername(name));
        assertTrue("To be found user", userService.isNameExist(name));

        String nonExistingName = "NOT_FOUND";
        when(userService.getUserByUsername(nonExistingName)).thenReturn(findByUsername(nonExistingName));
        assertTrue("To be NOT found user", !userService.isNameExist(nonExistingName));
    }

    @Test
    public void getUserByEmail() throws Exception {
        String email = users.get(0).email;
        when(userService.getUserByEmail(email)).thenReturn(findByEmail(email));
        assertEquals("To be found user", userService.getUserByEmail(email), users.get(0));

        String nonExistingEmail = "Email@email.test";
        when(userService.getUserByEmail(nonExistingEmail)).thenReturn(findByEmail(nonExistingEmail));
        assertNull("To be NOT found user", userService.getUserByEmail(nonExistingEmail));
    }

    @Test
    public void findAllUsersByIds() throws Exception {
        Set<Long> ids = new HashSet<>(Arrays.asList(1L, 2L, 9L, 10L));
        when(repository.findAll(ids)).thenReturn(findByIds(ids));
        assertEquals("Size to be equals " + ids.size(), userService.findAllUsersByIds(ids).size(), ids.size());
    }

    @Test
    public void getUserByUsername() throws Exception {
        String name = users.get(0).name;
        when(userService.getUserByUsername(name)).thenReturn(findByUsername(name));
        assertNotNull("To be found user", userService.getUserByUsername(name));

        String nonExistingName = "NOT_FOUND";
        when(userService.getUserByUsername(nonExistingName)).thenReturn(findByUsername(nonExistingName));
        assertNull("To be NOT found user", userService.getUserByUsername(nonExistingName));
    }

    private User findByEmail(String email) {
        return users
                .stream()
                .filter(user -> user.email.equalsIgnoreCase(email))
                .findFirst()
                .orElse(null);
    }

    private User findByUsername(String name) {
        return users
                .stream()
                .filter(user -> user.name.equals(name))
                .findFirst()
                .orElse(null);
    }

    private List<User> findByIds(Set<Long> ids) {
        return users
                .stream()
                .filter(user -> ids.contains(user.getId()))
                .collect(toList());
    }

    private List<User> createUsers() {
        return IntStream.range(0, 11)
                .boxed()
                .map(i -> createUser(i + 1L))
                .collect(toList());

    }

    private User cloneUser(User user) {
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

    private User createUser(Long id) {
        User user = new User();
        String rawPassword = "password";
        user.hashPassword = realPasswordEncoder.encode(rawPassword);
        if (Objects.isNull(id)) {
            id = new Date().getTime();
        }
        user.setId(id);
        user.name = "name" + (id);
        user.email = "email" + (id) + "@email";
        Role userRole = new Role();
        userRole.title = RoleConst.USER;
        user.role = userRole;
        return user;
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
                .peek(user -> {
                    if (user.getId() > users.size() - getSizeApprovedUsers()) {
                        user.approvedBy = getUserByRoleTitle(RoleConst.MANAGER);
                    }
                })
                .collect(toList());
    }

    private void reject3users() {
        users = users.stream()
                .peek(user -> {
                    if (user.getId() > users.size() - getSizeApprovedUsers()) {
                        user.approvedBy = getUserByRoleTitle(RoleConst.MANAGER);
                        user.rejected = true;
                    }
                })
                .collect(toList());
    }

    private void block4users() {
        users = users.stream()
                .peek(user -> {
                    if (user.getId() > users.size() - 4) {
                        user.blocked = true;
                    }
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
                getUsersRejectedByManager(manager),
                getPageable(),
                countRejectedUser(manager));
    }

    private int getSizeApprovedUsers() {
        return 3;
    }

    private long countRejectedUser(User manager) {
        return getUsersRejectedByManager(manager)
                .size();
    }

    private List<User> getUsersRejectedByManager(User manager) {
        return users.stream()
                .filter(user -> user.rejected && user.approvedBy.equals(manager))
                .collect(toList());
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
                .orElse(null);
    }
}