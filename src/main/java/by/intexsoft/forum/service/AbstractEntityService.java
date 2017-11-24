package by.intexsoft.forum.service;

import by.intexsoft.forum.entity.AbstractVersionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AbstractEntityService<T extends AbstractVersionEntity> {
    void delete(long id);

	T save(T entity);

	T find(long id);

	List<T> findAll();

    Page<T> findAll(Pageable pageable);
}
