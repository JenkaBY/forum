package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface RoleRepository extends JpaRepository<Role, Long> {
}

