package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);
}