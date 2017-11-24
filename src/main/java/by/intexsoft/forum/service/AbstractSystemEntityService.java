package by.intexsoft.forum.service;

import by.intexsoft.forum.entity.AbstractSystemEntity;

import java.util.List;

public interface AbstractSystemEntityService<T extends AbstractSystemEntity> {
    T find(long id);

    List<T> findAll();
}
