package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    public Page<User> findByApprovedByIsNull(Pageable pageable);

    public Page<User> findByApprovedByAndRejectedFalse(User approvedBy, Pageable pageable);

    public Page<User> findByApprovedByAndRejectedTrue(User approvedBy, Pageable pageable);

    public Page<User> findByBlockedTrue(Pageable pageable);
}

