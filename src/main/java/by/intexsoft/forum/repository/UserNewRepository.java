package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.UserNew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UserNewRepository extends JpaRepository<UserNew, Long> {
}

