package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.UserNew;
import by.intexsoft.forum.service.UserNewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class UserNewServiceImpl extends AbstractEntityServiceImpl<UserNew> implements UserNewService {

    @Autowired
    public UserNewServiceImpl(JpaRepository<UserNew, Long> repository) {
        super(repository);
    }
}
