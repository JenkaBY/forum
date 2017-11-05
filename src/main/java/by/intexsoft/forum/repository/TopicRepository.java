package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// Try to realize soft deleting
//https://github.com/dzinot/spring-boot-jpa-soft-delete/blob/master/src/main/java/com/kristijangeorgiev/softdelete/repository/SoftDeletesRepositoryImpl.java

public interface TopicRepository extends JpaRepository<Topic, Long> {

    //    @Query("select distinct T from topics T left join User U where U.id =:userId or T.created_by = :userId")
    //    @Query("select t from Topic t join User u where :user member of u.allowedUsers")

    @Query(value = "select distinct t.* from topics t left join topics_users TU on TU.topic_id = t.id " +
            "where TU.user_id = ?1 or T.created_by = ?1 order by ?#{#pageable}",
            countQuery = "select count(T.*) from topics T left join topics_users TU on TU.topic_id = T.id " +
                    "where TU.user_id = ?1 or T.created_by = ?1",
            nativeQuery = true)
    Page<Topic> findAllTopics(@Param("userId") long userId, Pageable pageable);

}

