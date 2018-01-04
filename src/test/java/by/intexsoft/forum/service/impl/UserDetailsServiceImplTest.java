package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.service.UserService;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserDetailsServiceImplTest {
    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;
    @Mock
    private UserService userService;

    private TestHelper helper = new TestHelper();
    private List<User> users;

    @Before
    public void setUp() throws Exception {
        users = helper.getUsers();
    }

    @After
    public void tearDown() throws Exception {
        users = null;
        helper = null;
    }

    @Test
    public void loadUserByUsername() throws Exception {
        final int first = 1;
        final User user = users.get(first);
        final String email = user.email;
        mockGetUserByEmail(email);
        final UserDetails loadedSpringUser = userDetailsService.loadUserByUsername(email);
        Assert.assertEquals("Spring User should be created.",
                loadedSpringUser, convertFromUser(user));

        Assert.assertFalse("Spring User should be disabled", loadedSpringUser.isEnabled());
        Assert.assertTrue("Spring User should be nonLocked", loadedSpringUser.isAccountNonLocked());

        Assert.assertEquals("Spring User should have GrandAuthority " + user.role.title.toUpperCase(),
                loadedSpringUser.getAuthorities().stream()
                        .findFirst()
                        .orElse(null)
                        .getAuthority()
                , "ROLE_" + user.role.title.toUpperCase());
    }

    @Test(expected = UsernameNotFoundException.class)
    public void loadUserByUserNameTestException() {
        final String nonExistedEmail = "nonExist@email.com";
        mockGetUserByEmail(nonExistedEmail);
        userDetailsService.loadUserByUsername(nonExistedEmail);
    }

    private void mockGetUserByEmail(String email) {
        when(userService.getUserByEmail(email)).thenReturn(helper.findByEmail(email));
    }

    private UserDetails convertFromUser(User user) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add((GrantedAuthority) () -> "ROLE_" + user.role.title.toUpperCase());
        return new org.springframework.security.core.userdetails.User(
                user.email,
                user.hashPassword,
                Objects.nonNull(user.approvedBy), //enabled,
                true, //accountNonExpired,
                true, //credentialsNonExpired,
                !user.blocked,//accountNonLocked,
                authorities
        );
    }
}
