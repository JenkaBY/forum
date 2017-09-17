package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Role;
import by.intexsoft.forum.repository.RoleRepository;
import by.intexsoft.forum.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl extends AbstractEntityServiceImpl<Role> implements RoleService {

    @Autowired
    public RoleServiceImpl(RoleRepository repository) {
        super(repository);
    }
}
