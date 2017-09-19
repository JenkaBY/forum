package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

// Try to realize soft deleting
//https://github.com/dzinot/spring-boot-jpa-soft-delete/blob/master/src/main/java/com/kristijangeorgiev/softdelete/repository/SoftDeletesRepositoryImpl.java

public interface UserRepository extends JpaRepository<User, Long> {

    Page<User> findByApprovedByIsNull(Pageable pageable);

    Page<User> findByApprovedByAndRejectedFalse(User approvedBy, Pageable pageable);

    Page<User> findByApprovedByAndRejectedTrue(User approvedBy, Pageable pageable);

    Page<User> findByBlockedTrue(Pageable pageable);
}

