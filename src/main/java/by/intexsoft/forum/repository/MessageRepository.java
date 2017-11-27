package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Message;
import by.intexsoft.forum.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

// Try to realize soft deleting
//https://github.com/dzinot/spring-boot-jpa-soft-delete/blob/master/src/main/java/com/kristijangeorgiev/softdelete/repository/SoftDeletesRepositoryImpl.java

/**
 * Interface for managing 'Message' entities
 */
public interface MessageRepository extends JpaRepository<Message, Long> {
    /**
     * Returns page object with messages in topic given in parameter
     *
     * @param topic    in this topic to be found messages
     * @param pageable object for getting content per page
     * @return page with content and parameter of page content
     */
    Page<Message> findByInTopicOrderByCreatedAt(Topic topic, Pageable pageable);
}