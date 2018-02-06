package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.constant.RoleConst;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.repository.UserRepository;
import by.intexsoft.forum.service.RoleService;
import by.intexsoft.forum.service.impl.helper.TestHelper;
import by.intexsoft.forum.service.impl.helper.role.RoleTestHelper;
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
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static java.util.stream.Collectors.toList;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceImplTest {
    private TestHelper helper = new TestHelper();
    private PasswordEncoder realPasswordEncoder = new BCryptPasswordEncoder();

    @Mock
    private PasswordEncoder mockBCryptPasswordEncoder;
    @Mock
    private UserRepository mockUserRepository;
    @Mock
    private RoleService mockRoleService;

    @Spy
    @InjectMocks
    private UserServiceImpl userService;

    private List<User> users;
    private Pageable pageable;

    @Before
    public void setUp() throws Exception {
        users = helper.getUsers();
        pageable = helper.getPageable();
    }

    @After
    public void tearDown() throws Exception {
        users = null;
        pageable = null;
    }

    @Test
    public void findAll() throws Exception {
        when(mockUserRepository.findAll(pageable)).thenReturn(getPageUsers());
        assertEquals("Contains the " + helper.getPageSize() + " users",
                userService.findAll(pageable).getContent().size(), helper.getPageSize());
        users = new ArrayList<>();
        when(mockUserRepository.findAll(pageable)).thenReturn(getPageUsers());
        assertEquals("Contains the " + 0 + " users", userService.findAll(pageable).getContent().size(), 0);
    }

    @Test
    public void findAllPendingToApprove() throws Exception {
        approve3users();
        when(mockUserRepository.findByApprovedByIsNullAndRejectedIsFalse(pageable)).thenReturn(pendingToApproveUsers());
        assertEquals("Contains the " + sizeNonApprovedUser() + " users",
                userService.findAllPendingToApprove(helper.getPageable()).getContent().size(), sizeNonApprovedUser());
    }

    @Test
    public void findAllApprovedByAndNotRejected() throws Exception {
        approve3users();
        User admin = helper.getUserByRoleTitle(RoleConst.ADMIN);
        when(mockUserRepository.findByApprovedByAndRejectedFalse(admin, pageable)).thenReturn(approvedUsers(admin));
        assertEquals("Contains the " + sizeNonApprovedUser() + " users",
                userService.findAllApprovedByAndNotRejected(admin, pageable).getContent().size(),
                sizeApprovedUserByManager(admin));
    }

    @Test
    public void findAllApprovedByAndRejected() throws Exception {
        reject3users();
        User admin = helper.getUserByRoleTitle(RoleConst.ADMIN);
        when(mockUserRepository.findByApprovedByIsNullAndRejectedIsFalse(pageable)).thenReturn(rejectedUsers(admin));
        assertEquals(userService.findAllPendingToApprove(pageable).getContent().size(), sizeRejectedUser(admin));
    }

    @Test
    public void findAllBlocked() throws Exception {
        block4users();
        when(mockUserRepository.findByBlockedTrue(helper.getPageable())).thenReturn(blockedUsers());
        assertEquals(sizeBlockedUser(), userService.findAllBlocked(helper.getPageable()).getContent().size());
    }

    @Test
    public void save() throws Exception {
        User newUser = helper.createUser(null);
        newUser.setId(users.size());
        User savedUser = helper.cloneUser(newUser);
        savedUser.setId(users.size());
        when(mockUserRepository.save(newUser)).thenReturn(savedUser);
        assertEquals("new user should have an ID after saving", userService.save(newUser), savedUser);

        User updatedUser = helper.cloneUser(savedUser);
        updatedUser.name = "updated";
        when(mockUserRepository.save(savedUser)).thenReturn(updatedUser);
        assertEquals("name should be updated", userService.save(savedUser).name, updatedUser.name);
    }

    @Test
    public void saveNewUserAndEncryptPassword() {
        User newUser = helper.createUser(null);
        newUser.setId(0);
        newUser.hashPassword = TestHelper.PASSWORD;
        final String camelCaseEmail = "camelCase@email.com";
        newUser.email = camelCaseEmail;

        User resultUser = helper.cloneUser(newUser);
        resultUser.setId(users.size());
        resultUser.hashPassword = realPasswordEncoder.encode(TestHelper.PASSWORD);
        resultUser.email = camelCaseEmail.toLowerCase();

        when(mockUserRepository.save(newUser)).thenReturn(helper.cloneUser(resultUser));
        when(mockRoleService.findByTitle(RoleConst.USER)).thenReturn(RoleTestHelper.USER);

        User savedNewUser = userService.save(newUser);

        verify(mockBCryptPasswordEncoder).encode(anyString());
        verify(mockUserRepository).save(newUser);
        assertNotEquals("Password should be encrypted.", savedNewUser.hashPassword, TestHelper.PASSWORD);
        assertNotNull("Password should not be NULL.", savedNewUser.hashPassword);
        assertEquals("Email should be saved in lowerCase.", savedNewUser.email, camelCaseEmail.toLowerCase());
        assertEquals(savedNewUser.getId(), resultUser.getId());
    }

    @Test
    public void saveAndUpdateUser() throws Exception {
        User newUser = helper.createUser(100L);
        User resultUser = helper.cloneUser(newUser);
        newUser.hashPassword = null;

        doReturn(resultUser).when(userService).find(newUser.getId());
        when(mockUserRepository.save(newUser)).thenReturn(resultUser);

        userService.save(newUser);

        assertNotNull("User password should be fetched.", resultUser.hashPassword);
    }

    @Test
    public void changePassword() throws Exception {
        String newPassword = "newPassword";
        User user = users.get(0);
        User clone = helper.cloneUser(user);
        clone.hashPassword = realPasswordEncoder.encode(newPassword);

        doReturn(clone).when(userService).save(user);

        userService.changePassword(user, newPassword);

        verify(mockBCryptPasswordEncoder).encode(anyString());
        verify(userService).save(any(User.class));
    }

    @Test
    public void isEmailExistTrue() throws Exception {
        String email = users.get(0).email;
        when(mockUserRepository.findByEmail(email)).thenReturn(helper.findByEmail(email));
        assertTrue("To be found user", userService.isEmailExist(email));
    }

    @Test
    public void isEmailExistFalse() throws Exception {
        String nonExistingEmail = "Email@email.test";
        assertFalse("To be NOT found user", userService.isEmailExist(nonExistingEmail));
    }

    @Test
    public void isNameExist() throws Exception {
        String name = users.get(0).name;
        when(mockUserRepository.findByName(name)).thenReturn(helper.findByUsername(name));
        assertTrue("To be found user", userService.isNameExist(name));

        String nonExistingName = "NOT_FOUND";
        when(mockUserRepository.findByName(nonExistingName)).thenReturn(null);
        assertFalse("To be NOT found user", userService.isNameExist(nonExistingName));
    }

    @Test
    public void getUserByEmail() throws Exception {
        final String email = users.get(0).email;
        when(mockUserRepository.findByEmail(email)).thenReturn(helper.findByEmail(email));
        assertEquals("To be found user", userService.getUserByEmail(email), users.get(0));
        verify(mockUserRepository).findByEmail(email);
    }

    @Test
    public void getUserByNonExistingEmail() throws Exception {
        final String nonExistingEmail = "nonExistingEmail@email.test";
        assertNull("To be NOT found user", userService.getUserByEmail(nonExistingEmail));
    }
    @Test
    public void findAllUsersByIds() throws Exception {
        Set<Long> ids = new HashSet<>(Arrays.asList(1L, 2L, 9L, 10L));
        when(mockUserRepository.findAll(ids)).thenReturn(findByIds(ids));
        assertEquals("Size to be equals " + ids.size(), userService.findAllUsersByIds(ids).size(), ids.size());
        verify(mockUserRepository).findAll(ids);
    }

    @Test
    public void getUserByUsername() throws Exception {
        final String name = users.get(0).name;
        when(mockUserRepository.findByName(name)).thenReturn(helper.findByUsername(name));
        assertNotNull("To be found user", userService.getUserByUsername(name));
        verify(mockUserRepository).findByName(name);
    }

    @Test
    public void getUserByNonExistingUsername() throws Exception {
        final String nonExistingName = "NOT_FOUND";

        assertNull("User is not found", userService.getUserByUsername(nonExistingName));
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
                        .limit(helper.getPageSize())
                        .collect(toList()),
                helper.getPageable(),
                users.size()
        );
    }

    private void approve3users() {
        users = users.stream()
                .peek(user -> {
                    if (user.getId() > users.size() - getSizeApprovedUsers()) {
                        user.approvedBy = helper.getUserByRoleTitle(RoleConst.ADMIN);
                    }
                })
                .collect(toList());
    }

    private void reject3users() {
        users = users.stream()
                .peek(user -> {
                    if (user.getId() > users.size() - getSizeApprovedUsers()) {
                        user.approvedBy = helper.getUserByRoleTitle(RoleConst.ADMIN);
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
                helper.getPageable(),
                sizeBlockedUser());
    }

    private Page<User> pendingToApproveUsers() {
        return new PageImpl<>(
                users.stream()
                        .filter(user -> Objects.isNull(user.approvedBy))
                        .collect(toList()),
                helper.getPageable(),
                sizeNonApprovedUser());
    }

    private Page<User> approvedUsers(User manager) {
        return new PageImpl<>(
                users.stream()
                        .filter(user -> Objects.nonNull(user.approvedBy) && user.approvedBy.equals(manager))
                        .collect(toList()),
                helper.getPageable(),
                sizeApprovedUserByManager(manager));
    }

    private Page<User> rejectedUsers(User manager) {
        return new PageImpl<>(
                getUsersRejectedByManager(manager),
                helper.getPageable(),
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
                .count();
    }

    private long sizeApprovedUserByManager(User manager) {
        return users.stream()
                .filter(user -> Objects.nonNull(user.approvedBy) && user.approvedBy.equals(manager))
                .count();
    }

    private long sizeBlockedUser() {
        return users.stream()
                .filter(user -> user.blocked)
                .count();
    }
}