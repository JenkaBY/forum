package by.intexsoft.forum.service;

import by.intexsoft.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface UserService extends AbstractEntityService<User> {
    Page<User> findAll(Pageable page);

    Page<User> findAllPendingToApprove(Pageable pageable);

    Page<User> findAllApprovedByAndNotRejected(User admin, Pageable pageable);

    Page<User> findAllApprovedByAndRejected(User admin, Pageable pageable);

    Page<User> findAllBlocked(Pageable pageable);

    void changePassword(User user, String newPassword);

    boolean isEmailExist(String email);

    boolean isNameExist(String name);
}