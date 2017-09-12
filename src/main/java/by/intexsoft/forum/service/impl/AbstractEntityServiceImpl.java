package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.AbstractEntity;
import by.intexsoft.forum.service.AbstractEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public class AbstractEntityServiceImpl<T extends AbstractEntity> implements AbstractEntityService<T> {

	@Autowired
	private JpaRepository<T, Integer> repository;

	@Override
	public void delete(int id) {
		repository.delete(id);
	}

	@Override
	public T save(T entity) {
		return repository.save(entity);
	}

	@Override
	public T find(int id) {
		return repository.findOne(id);
	}

	@Override
	public List<T> findAll() {
		return repository.findAll();
	}

}
