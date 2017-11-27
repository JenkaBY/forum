package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Status;
import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

// Try to realize soft deleting
//https://github.com/dzinot/spring-boot-jpa-soft-delete/blob/master/src/main/java/com/kristijangeorgiev/softdelete/repository/SoftDeletesRepositoryImpl.java

/**
 * Interface for managing 'Topic Request' entities
 */
public interface TopicRequestRepository extends JpaRepository<TopicRequest, Long> {
    /**
     * Looks for Topic Request with status
     *
     * @param status   object with status
     * @param pageable object that contains page parameter
     * @return page object containing Topic Request objects
     */
    Page<TopicRequest> findByStatus(Status status, Pageable pageable);

    /**
     * Looks for Topic Request requested by user given in params
     * @param user who requested topic request
     * @param pageable object that contains page parameter
     * @return page object containing Topic Request objects
     */
    Page<TopicRequest> findByRequestedBy(User user, Pageable pageable);
}