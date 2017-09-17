package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface TopicRepository extends JpaRepository<Topic, Long> {
}

