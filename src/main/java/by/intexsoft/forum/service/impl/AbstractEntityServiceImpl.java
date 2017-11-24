package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.AbstractVersionEntity;
import by.intexsoft.forum.service.AbstractEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public class AbstractEntityServiceImpl<T extends AbstractVersionEntity> implements AbstractEntityService<T> {

	protected JpaRepository<T, Long> repository;

	@Autowired
	public AbstractEntityServiceImpl(JpaRepository<T, Long> repository) {
		this.repository = repository;
	}

	@Override
	public void delete(long id) {
//		TODO commented to the best time
//        T entity = repository.findOne(id);
//        entity.deleted = true;
//        repository.save(entity);
        repository.delete(id);
    }

	@Override
	public T save(T entity) {
		return repository.save(entity);
	}

	@Override
	public T find(long id) {
		return repository.findOne(id);
	}

	@Override
	public List<T> findAll() {
		return repository.findAll();
	}

	@Override
	public Page<T> findAll(Pageable page) {
		return repository.findAll(page);
	}

}
