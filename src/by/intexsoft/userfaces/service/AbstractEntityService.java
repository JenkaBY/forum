package by.intexsoft.userfaces.service;

import java.util.List;

import by.intexsoft.userfaces.model.AbstractEntity;

public interface AbstractEntityService<T extends AbstractEntity> {
	void delete(int id);

	T save(T entity);

	T find(int id);

	List<T> findAll();
}
