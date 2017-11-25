package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.Status;
import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.entity.TopicDiscussRequest;
import by.intexsoft.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicDiscussRequestRepository extends JpaRepository<TopicDiscussRequest, Long> {

    Page<TopicDiscussRequest> findByStatus(Status status, Pageable pageable);

    Page<TopicDiscussRequest> findByRequestedBy(User user, Pageable pageable);

    TopicDiscussRequest findFirstByInTopicAndRequestedBy(Topic topicFromDb, User userFromDb);
}