package by.intexsoft.userfaces.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import by.intexsoft.userfaces.model.User;
import by.intexsoft.userfaces.repository.UserRepository;
import by.intexsoft.userfaces.service.UserService;

@Service
public class UserServiceImpl extends AbstractEntityServiceImpl<User> implements UserService {
	@Autowired
	private UserRepository repository;
	
	@Override
	public User findByEmail(String email) {
		if (email != null) {
			return repository.findByEmail(email);
		}
		return null;
	}
}
