package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.CreateTopicRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreateTopicRequestRepository extends JpaRepository<CreateTopicRequest, Long> {
}

