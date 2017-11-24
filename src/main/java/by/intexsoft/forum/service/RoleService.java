package by.intexsoft.forum.service;

import by.intexsoft.forum.entity.Role;

public interface RoleService extends AbstractSystemEntityService<Role> {
    Role findByTitle(String title);
}