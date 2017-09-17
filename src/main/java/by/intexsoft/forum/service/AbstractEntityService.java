package by.intexsoft.forum.service;

import by.intexsoft.forum.entity.AbstractEntity;

import java.util.List;

public interface AbstractEntityService<T extends AbstractEntity> {
	void delete(long id);

	T save(T entity);

	T find(long id);

	List<T> findAll();
}
