package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Interface for managing 'Status' entities
 */
public interface StatusRepository extends JpaRepository<Status, Long> {
    /**
     * Looks for Status by title. Title is unique constraint
     *
     * @param title title of status
     * @return status object
     */
    Status findByTitle(String title);
}
