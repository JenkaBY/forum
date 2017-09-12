package by.intexsoft.forum.service;

import by.intexsoft.forum.entity.User;

public interface UserService extends AbstractEntityService<User>{
	User findByEmail(String email);
}