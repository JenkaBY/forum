package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.CreateTopicRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface CreateTopicRequestRepository extends JpaRepository<CreateTopicRequest, Long> {
}

