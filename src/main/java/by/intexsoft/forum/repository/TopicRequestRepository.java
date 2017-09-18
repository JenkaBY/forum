package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.TopicRequest;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.entity.helper.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRequestRepository extends JpaRepository<TopicRequest, Long> {
    Page<TopicRequest> findAllByStatus(Status status, Pageable pageable);

    Page<TopicRequest> findByRequestedBy(User user, Pageable pageable);
}