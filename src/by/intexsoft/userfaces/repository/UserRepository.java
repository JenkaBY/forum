package by.intexsoft.userfaces.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import by.intexsoft.userfaces.model.User;

/**
 * Created by YKuzmich on 2017-07-18.
 */
@Transactional
public interface UserRepository  extends JpaRepository<User, Integer> {
	User findByEmail(String email);
}

