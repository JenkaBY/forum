package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {
    Status findByTitle(String title);
}
