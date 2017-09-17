package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.repository.UserRepository;
import by.intexsoft.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends AbstractEntityServiceImpl<User> implements UserService {

    @Autowired
    public UserServiceImpl(UserRepository repository) {
        super(repository);
    }
}
