package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

