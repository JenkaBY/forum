package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Status;
import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.entity.TopicDiscussRequest;
import by.intexsoft.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Interface for managing 'Topic Discuss Request' entities
 */
public interface TopicDiscussRequestRepository extends JpaRepository<TopicDiscussRequest, Long> {
    /**
     * Finds all Topic Discuss Requests by status
     *
     * @param status   of topic discuss requests
     * @param pageable object for getting content per page
     * @return {@code Page<TopicDiscussRequest>} page with content and parameter of page content
     */
    Page<TopicDiscussRequest> findByStatus(Status status, Pageable pageable);

    /**
     * Finds Topic Discuss Requests requested by user
     * @param user who requested topic discuss
     * @param pageable object for getting content per page
     * @return {@code Page<TopicDiscussRequest>} page with content and parameter of page content
     */
    Page<TopicDiscussRequest> findByRequestedBy(User user, Pageable pageable);

    /**
     * Finds first user's Topic Discuss Request
     * @param topicFromDb topic object for which user request to discuss
     * @param userFromDb user who create topic discuss request
     * @return topic discuss request
     */
    TopicDiscussRequest findFirstByInTopicAndRequestedBy(Topic topicFromDb, User userFromDb);
}