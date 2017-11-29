package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.AbstractSystemEntity;
import by.intexsoft.forum.service.AbstractSystemEntityService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public abstract class AbstractSystemEntityServiceImpl<T extends AbstractSystemEntity> implements AbstractSystemEntityService<T> {

    protected JpaRepository<T, Long> repository;

    public AbstractSystemEntityServiceImpl(JpaRepository<T, Long> repository) {
        this.repository = repository;
    }

    @Override
    public T find(long id) {
        return repository.findOne(id);
    }

    @Override
    public List<T> findAll() {
        return repository.findAll();
    }
}
