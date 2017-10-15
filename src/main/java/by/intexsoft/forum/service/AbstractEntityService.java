package by.intexsoft.forum.service;

import by.intexsoft.forum.entity.AbstractEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AbstractEntityService<T extends AbstractEntity> {
	void delete(long id);

	T save(T entity);

	T find(long id);

	List<T> findAll();

    Page<T> findAll(Pageable pageable);
}
