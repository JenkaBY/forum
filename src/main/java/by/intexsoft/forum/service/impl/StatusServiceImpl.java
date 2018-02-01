package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Status;
import by.intexsoft.forum.repository.StatusRepository;
import by.intexsoft.forum.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusServiceImpl extends AbstractSystemEntityServiceImpl<Status> implements StatusService {

    @Autowired
    public StatusServiceImpl(StatusRepository repository) {
        super(repository);
    }

    @Override
    public Status findByTitle(String title) {
        return ((StatusRepository) repository).findByTitle(title);
    }
}