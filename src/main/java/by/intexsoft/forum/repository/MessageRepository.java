package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Message;
import by.intexsoft.forum.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

// Try to realize soft deleting
//https://github.com/dzinot/spring-boot-jpa-soft-delete/blob/master/src/main/java/com/kristijangeorgiev/softdelete/repository/SoftDeletesRepositoryImpl.java
public interface MessageRepository extends JpaRepository<Message, Long> {
    Page<Message> findByInTopicOrderByCreatedAt(Topic topic, Pageable pageable);
}

