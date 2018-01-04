package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.constant.RoleConst;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.repository.UserRepository;
import by.intexsoft.forum.service.RoleService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static java.util.stream.Collectors.toList;
import static org.junit.Assert.*;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceImplTest {
    private TestHelper helper = new TestHelper();
    private PasswordEncoder realPasswordEncoder = new BCryptPasswordEncoder();

    @Mock
    private PasswordEncoder bCryptPasswordEncoder;
    @Mock
    private UserRepository repository;
    @Mock
    private RoleService roleService;
    @Mock
    private UserServiceImpl mockedUserService;

    @Spy
    @InjectMocks
    private UserServiceImpl userService;

    private List<User> users;
    private Pageable pageable;

    @Before
    public void setUp() throws Exception {
        users = helper.getUsers();
        pageable = getPageable();
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
        assertEquals("Contains the " + sizeNonApprovedUser() + " users", userService.findAllPendingToApprove(getPageable()).getContent().size(), sizeNonApprovedUser());
    }

    @Test
    public void findAllApprovedByAndNotRejected() throws Exception {
        approve3users();
        User manager = helper.getUserByRoleTitle(RoleConst.MANAGER);
        when(repository.findByApprovedByAndRejectedFalse(manager, pageable)).thenReturn(approvedUsers(manager));
        assertEquals("Contains the " + sizeNonApprovedUser() + " users", userService.findAllApprovedByAndNotRejected(manager, pageable)
                .getContent().size(), sizeApprovedUserByManager(manager));
    }

    @Test
    public void findAllApprovedByAndRejected() throws Exception {
        reject3users();
        User manager = helper.getUserByRoleTitle(RoleConst.MANAGER);
        when(repository.findByApprovedByIsNullAndRejectedIsFalse(pageable)).thenReturn(rejectedUsers(manager));
        assertEquals(userService.findAllPendingToApprove(pageable).getContent().size(), sizeRejectedUser(manager));
    }

    @Test
    public void findAllBlocked() throws Exception {
        block4users();
        when(repository.findByBlockedTrue(getPageable())).thenReturn(blockedUsers());
        assertEquals(sizeBlockedUser(), userService.findAllBlocked(getPageable()).getContent().size());
    }

    @Test
    public void save() throws Exception {
        User newUser = helper.createUser(null);
        newUser.setId(users.size());
        User savedUser = helper.cloneUser(newUser);
        savedUser.setId(users.size());
        when(repository.save(newUser)).thenReturn(savedUser);
        assertEquals("new user should have an ID after saving", userService.save(newUser), savedUser);

        User updatedUser = helper.cloneUser(savedUser);
        updatedUser.name = "updated";
        when(repository.save(savedUser)).thenReturn(updatedUser);
        assertEquals("name should be updated", userService.save(savedUser).name, updatedUser.name);
    }

    @Test
    public void saveNewUserAndEncryptPassword() {
        User newUser = helper.createUser(null);
        newUser.setId(0);
        newUser.hashPassword = TestHelper.PASSWORD;
        final String camelCaseEmail = "camelCase@email.com";
        newUser.email = camelCaseEmail;
        User savedUser = helper.cloneUser(newUser);
        savedUser.setId(users.size());
        savedUser.hashPassword = realPasswordEncoder.encode(TestHelper.PASSWORD);
        savedUser.email = camelCaseEmail.toLowerCase();

        when(bCryptPasswordEncoder.encode(newUser.hashPassword)).thenReturn(realPasswordEncoder.encode(TestHelper.PASSWORD));
        when(repository.save(newUser)).thenReturn(helper.cloneUser(savedUser));
        when(roleService.findByTitle(RoleConst.USER)).thenReturn(helper.getUserByRoleTitle(RoleConst.USER).role);
        newUser = userService.save(newUser);
        assertNotEquals("Password should be encrypted.", newUser.hashPassword, TestHelper.PASSWORD);
        assertEquals("Email should be saved in lowerCase.", newUser.email, camelCaseEmail.toLowerCase());
        assertEquals(newUser.getId(), savedUser.getId());

        newUser.hashPassword = null;
        doReturn(savedUser).when(userService).find(newUser.getId());
        when(repository.save(newUser)).thenReturn(savedUser);

        userService.save(newUser);
        assertNotNull("User password should be fetched.", newUser.hashPassword);
    }

    @Test
    public void changePassword() throws Exception {
        String newPassword = "newPassword";
        User user = users.get(0);
        User clone = helper.cloneUser(user);
        clone.hashPassword = realPasswordEncoder.encode(newPassword);
        when(bCryptPasswordEncoder.encode(newPassword)).thenReturn(realPasswordEncoder.encode(newPassword));
        when(repository.save(user)).thenReturn(clone);
        userService.changePassword(user, newPassword);
        assertTrue("New password to be saved", realPasswordEncoder.matches(newPassword, user.hashPassword));
    }

    @Test
    public void isEmailExist() throws Exception {
        String email = users.get(0).email;
        when(userService.getUserByEmail(email)).thenReturn(helper.findByEmail(email));
        assertTrue("To be found user", userService.isEmailExist(email));

        String nonExistingEmail = "Email@email.test";
        when(userService.getUserByEmail(nonExistingEmail)).thenReturn(helper.findByEmail(nonExistingEmail));
        assertFalse("To be NOT found user", userService.isEmailExist(nonExistingEmail));
    }

    @Test
    public void isNameExist() throws Exception {
        String name = users.get(0).name;
        when(userService.getUserByUsername(name)).thenReturn(helper.findByUsername(name));
        assertTrue("To be found user", userService.isNameExist(name));

        String nonExistingName = "NOT_FOUND";
        when(userService.getUserByUsername(nonExistingName)).thenReturn(helper.findByUsername(nonExistingName));
        assertFalse("To be NOT found user", userService.isNameExist(nonExistingName));
    }

    @Test
    public void getUserByEmail() throws Exception {
        String email = users.get(0).email;
        when(userService.getUserByEmail(email)).thenReturn(helper.findByEmail(email));
        assertEquals("To be found user", userService.getUserByEmail(email), users.get(0));

        String nonExistingEmail = "Email@email.test";
        when(userService.getUserByEmail(nonExistingEmail)).thenReturn(helper.findByEmail(nonExistingEmail));
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
        when(userService.getUserByUsername(name)).thenReturn(helper.findByUsername(name));
        assertNotNull("To be found user", userService.getUserByUsername(name));

        String nonExistingName = "NOT_FOUND";
        when(userService.getUserByUsername(nonExistingName)).thenReturn(helper.findByUsername(nonExistingName));
        assertNull("To be NOT found user", userService.getUserByUsername(nonExistingName));
    }


    private List<User> findByIds(Set<Long> ids) {
        return users
                .stream()
                .filter(user -> ids.contains(user.getId()))
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
                .peek(user -> {
                    if (user.getId() > users.size() - getSizeApprovedUsers()) {
                        user.approvedBy = helper.getUserByRoleTitle(RoleConst.MANAGER);
                    }
                })
                .collect(toList());
    }

    private void reject3users() {
        users = users.stream()
                .peek(user -> {
                    if (user.getId() > users.size() - getSizeApprovedUsers()) {
                        user.approvedBy = helper.getUserByRoleTitle(RoleConst.MANAGER);
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
                sizeBlockedUser());
    }

    private Page<User> pendingToApproveUsers() {
        return new PageImpl<>(
                users.stream()
                        .filter(user -> Objects.isNull(user.approvedBy))
                        .collect(toList()),
                getPageable(),
                sizeNonApprovedUser());
    }

    private Page<User> approvedUsers(User manager) {
        return new PageImpl<>(
                users.stream()
                        .filter(user -> Objects.nonNull(user.approvedBy) && user.approvedBy.equals(manager))
                        .collect(toList()),
                getPageable(),
                sizeApprovedUserByManager(manager));
    }

    private Page<User> rejectedUsers(User manager) {
        return new PageImpl<>(
                getUsersRejectedByManager(manager),
                getPageable(),
                sizeRejectedUser(manager));
    }

    private int getSizeApprovedUsers() {
        return 3;
    }

    private long sizeRejectedUser(User manager) {
        return getUsersRejectedByManager(manager)
                .size();
    }

    private List<User> getUsersRejectedByManager(User manager) {
        return users.stream()
                .filter(user -> user.rejected && user.approvedBy.equals(manager))
                .collect(toList());
    }

    private long sizeNonApprovedUser() {
        return users.stream()
                .filter(user -> Objects.isNull(user.approvedBy))
                .collect(toList())
                .size();
    }

    private long sizeApprovedUserByManager(User manager) {
        return users.stream()
                .filter(user -> Objects.nonNull(user.approvedBy) && user.approvedBy.equals(manager))
                .collect(toList())
                .size();
    }

    private long sizeBlockedUser() {
        return users.stream()
                .filter(user -> user.blocked)
                .collect(toList())
                .size();
    }
}