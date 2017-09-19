package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

// Try to realize soft deleting
//https://github.com/dzinot/spring-boot-jpa-soft-delete/blob/master/src/main/java/com/kristijangeorgiev/softdelete/repository/SoftDeletesRepositoryImpl.java
public interface MessageRepository extends JpaRepository<Message, Long> {
}

