package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Role;
import by.intexsoft.forum.repository.RoleRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;

import static by.intexsoft.forum.service.impl.TestHelper.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.doReturn;

@RunWith(MockitoJUnitRunner.class)
public class RoleServiceImplTest {
    @InjectMocks
    private RoleServiceImpl roleService;

    private List<Role> roles = Arrays.asList(USER, ADMIN, MANAGER, SYSTEM);

    @Mock
    private RoleRepository mockRoleRepository;

    @Test
    public void findByTitle() throws Exception {
        doReturn(findByTitle("ADMIN")).when(mockRoleRepository).findByTitle("ADMIN");
        Role userRole = roleService.findByTitle("ADMIN");
        assertNotNull(userRole);
        assertEquals(ADMIN, userRole);
    }

    @Test
    public void find() throws Exception {
        doReturn(findById(USER.getId())).when(mockRoleRepository).findOne(USER.getId());
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

    private Role findById(long id) {
        return roles.stream().filter(role -> role.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    private Role findByTitle(String title) {
        return roles.stream().filter(role -> role.title.equals(title))
                .findFirst()
                .orElse(null);
    }
}