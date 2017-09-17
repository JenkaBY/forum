package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface MessageRepository extends JpaRepository<Message, Long> {
}

