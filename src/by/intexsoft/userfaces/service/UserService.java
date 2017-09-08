package by.intexsoft.userfaces.service;

import by.intexsoft.userfaces.model.User;

public interface UserService extends AbstractEntityService<User>{
	User findByEmail(String email);
}