package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.repository.UserRepository;
import by.intexsoft.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends AbstractEntityServiceImpl<User> implements UserService {

    @Autowired
    public UserServiceImpl(UserRepository repository) {
        super(repository);
    }

    /**
     * Поиск всех юзеров
     *
     * @param page Pageable объект, который содержит параметры для постраничного вывода
     * @return Page<User> постраничный список всех пользователей
     */
    @Override
    public Page<User> findAll(Pageable page) {
        return repository.findAll(page);
    }

    /**
     * Ищет всех пользователей ожидающих подтверждения регистрации
     *
     * @param pageable Pageable объект, который содержит параметры для постраничного вывода
     * @return Page<User> постраничный список пользователей
     */
    @Override
    public Page<User> findAllPendingToApprove(Pageable pageable) {
        return ((UserRepository) repository).findByApprovedByIsNull(pageable);
    }

    /**
     * Поиск users которые подтверждены администратором
     *
     * @param admin    ид админстратора, который подтвердил регистрацию пользователя
     * @param pageable Pageable объект, который содержит параметры для постраничного вывода
     * @return Page<User> постраничный список пользователей
     */
    @Override
    public Page<User> findAllApprovedByAndNotRejected(User admin, Pageable pageable) {
        return ((UserRepository) repository).findByApprovedByAndRejectedFalse(admin, pageable);
    }

    /**
     * Поиск users которые отвергнуты администратором
     *
     * @param admin    ид админстратора, который подтвердил регистрацию пользователя
     * @param pageable Pageable объект, который содержит параметры для постраничного вывода
     * @return Page<User> постраничный список пользователей
     */
    @Override
    public Page<User> findAllApprovedByAndRejected(User admin, Pageable pageable) {
        return ((UserRepository) repository).findByApprovedByAndRejectedTrue(admin, pageable);
    }

    /**
     * Поиск всех заблокированных польщователей.
     *
     * @param pageable Pageable объект, который содержит параметры для постраничного вывода
     * @return Page<User> постраничный список всех пользователей
     */
    @Override
    public Page<User> findAllBlocked(Pageable pageable) {
        return ((UserRepository) repository).findByBlockedTrue(pageable);
    }
}