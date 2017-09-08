package by.intexsoft.userfaces.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import by.intexsoft.userfaces.model.AbstractEntity;
import by.intexsoft.userfaces.service.AbstractEntityService;

/**
 * @author JenkaBY
 *
 */
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
