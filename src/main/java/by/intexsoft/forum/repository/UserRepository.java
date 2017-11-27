package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

// Try to realize soft deleting
//https://github.com/dzinot/spring-boot-jpa-soft-delete/blob/master/src/main/java/com/kristijangeorgiev/softdelete/repository/SoftDeletesRepositoryImpl.java

/**
 * Interface for managing 'User' entities
 */
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Gets user by email
     *
     * @param email user's email
     * @return found user
     */
    User findByEmail(String email);

    /**
     * Finds user by user's name
     * @param name user's name
     * @return found user
     */
    User findByName(String name);

    /**
     * Finds all not approved users. Returns result per page
     * @param pageable object that contains page parameter
     * @return Page with found users.
     */
    Page<User> findByApprovedByIsNullAndRejectedIsFalse(Pageable pageable);

    /**
     * Finds all not rejected users and approved by user. Returns result per page
     * @param approvedBy approver user for which need to fetch users
     * @param pageable object that contains page parameter
     * @return Page with found users.
     */
    Page<User> findByApprovedByAndRejectedFalse(User approvedBy, Pageable pageable);

    /**
     * Finds all rejected users and approved by user. Returns result per page
     * @param approvedBy approver user for which need to fetch users
     * @param pageable object that contains page parameter
     * @return Page with found users.
     */
    Page<User> findByApprovedByAndRejectedTrue(User approvedBy, Pageable pageable);

    /**
     * Finds all blocked users. Return result per page
     * @param pageable object that contains page parameter
     * @return Page with found users.
     */
    Page<User> findByBlockedTrue(Pageable pageable);
}

