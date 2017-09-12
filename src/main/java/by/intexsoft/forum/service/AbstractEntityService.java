package by.intexsoft.forum.service;

import by.intexsoft.forum.entity.AbstractEntity;

import java.util.List;

public interface AbstractEntityService<T extends AbstractEntity> {
	void delete(int id);

	T save(T entity);

	T find(int id);

	List<T> findAll();
}
