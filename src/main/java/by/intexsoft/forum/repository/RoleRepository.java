package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

// Try to realize soft deleting
//https://github.com/dzinot/spring-boot-jpa-soft-delete/blob/master/src/main/java/com/kristijangeorgiev/softdelete/repository/SoftDeletesRepositoryImpl.java

/**
 * Interface for managing 'Role' entities
 */
public interface RoleRepository extends JpaRepository<Role, Long> {
    /**
     * Finds Role by title
     *
     * @param title of the role
     * @return Role object
     */
    Role findByTitle(String title);
}

