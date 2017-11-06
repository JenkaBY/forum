package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// Try to implement soft deleting
//https://github.com/dzinot/spring-boot-jpa-soft-delete/blob/master/src/main/java/com/kristijangeorgiev/softdelete/repository/SoftDeletesRepositoryImpl.java

public interface TopicRepository extends JpaRepository<Topic, Long> {

    @Query("select t from Topic t left join t.allowedUsers u where t.createdBy.id = :userId or u.id = :userId")
    Page<Topic> findAllTopics(@Param("userId") long userId, Pageable pageable);

}

