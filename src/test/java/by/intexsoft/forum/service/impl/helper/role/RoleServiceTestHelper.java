package by.intexsoft.forum.service.impl.helper.role;

import by.intexsoft.forum.entity.Role;

import java.util.Arrays;
import java.util.List;

import static by.intexsoft.forum.service.impl.helper.role.RoleTestHelper.*;

public class RoleServiceTestHelper {
    private List<Role> roles = Arrays.asList(USER, ADMIN, MANAGER, SYSTEM);

    public List<Role> getRoles() {
        return roles;
    }

    public Role findById(long id) {
        return roles.stream().filter(role -> role.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Role findByTitle(String title) {
        return roles.stream().filter(role -> role.title.equals(title))
                .findFirst()
                .orElse(null);
    }
}