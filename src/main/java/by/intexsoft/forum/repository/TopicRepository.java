package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// Try to implement soft deleting
//https://github.com/dzinot/spring-boot-jpa-soft-delete/blob/master/src/main/java/com/kristijangeorgiev/softdelete/repository/SoftDeletesRepositoryImpl.java

/**
 * Interface serves for managing topics
 */
public interface TopicRepository extends JpaRepository<Topic, Long> {
    /**
     * Gets all topics by user Id per page
     *
     * @param userId   user's ID
     * @param pageable object for getting content per page
     * @return {@code Page<Topic>} page with content and parameter of page content
     */
    @Query("select t from Topic t left join t.allowedUsers u where t.createdBy.id = :userId or u.id = :userId")
    Page<Topic> findAllTopics(@Param("userId") long userId, Pageable pageable);

    /**
     * Gets all topics title of which contains {@code titleToFind}
     * @param titleToFind title of topics to be found
     * @param pageable object for getting content per page
     * @return {@code Page<Topic>} page with content and parameter of page content
     */
    Page<Topic> findByTitleContainingIgnoreCase(String titleToFind, Pageable pageable);
}

