package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Role;
import by.intexsoft.forum.repository.RoleRepository;
import by.intexsoft.forum.service.impl.helper.role.RoleServiceTestHelper;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.List;

import static by.intexsoft.forum.service.impl.helper.role.RoleTestHelper.ADMIN;
import static by.intexsoft.forum.service.impl.helper.role.RoleTestHelper.USER;
import static org.junit.Assert.*;
import static org.mockito.Mockito.doReturn;

@RunWith(MockitoJUnitRunner.class)
public class RoleServiceImplTest {
    @InjectMocks
    private RoleServiceImpl roleService;
    @Mock
    private RoleRepository mockRoleRepository;
    private RoleServiceTestHelper roleServiceHelper;
    private List<Role> roles;

    @Before
    public void setUp() throws Exception {
        roleServiceHelper = new RoleServiceTestHelper();
        roles = roleServiceHelper.getRoles();
    }

    @After
    public void tearDown() throws Exception {
        roles = null;
        roleServiceHelper = null;
    }

    @Test
    public void findByTitle() throws Exception {
        doReturn(roleServiceHelper.findByTitle("ADMIN")).when(mockRoleRepository).findByTitle("ADMIN");
        Role userRole = roleService.findByTitle("ADMIN");
        assertNotNull(userRole);
        assertEquals(ADMIN, userRole);
    }

    @Test
    public void find() throws Exception {
        doReturn(roleServiceHelper.findById(USER.getId())).when(mockRoleRepository).findOne(USER.getId());
        Role userRole = roleService.find(USER.getId());
        assertNotNull(userRole);
    }

    @Test
    public void findAll() throws Exception {
        doReturn(roles).when(mockRoleRepository).findAll();
        List<Role> rolesFromDB = roleService.findAll();
        assertNotNull(rolesFromDB);
        assertEquals(rolesFromDB.size(), roles.size());
        assertTrue(rolesFromDB.contains(USER));
    }
}