package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.constant.RoleConst;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.repository.UserRepository;
import by.intexsoft.forum.service.RoleService;
import by.intexsoft.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl extends AbstractEntityServiceImpl<User> implements UserService {
    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;
    private RoleService roleService;

    @Autowired
    public UserServiceImpl(UserRepository repository, RoleService roleService) {
        super(repository);
        this.roleService = roleService;
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
        return ((UserRepository) repository).findByApprovedByIsNullAndRejectedIsFalse(pageable);
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

    @Override
    public User save(User user) {
        if (isNewUser(user)) {
            user.hashPassword = bCryptPasswordEncoder.encode(user.hashPassword);
            user.email = user.email.toLowerCase();
            user.role = roleService.findByTitle(RoleConst.USER);
        }
        if (needToFetchHashPassword(user)) {
            user.hashPassword = this.find(user.getId()).hashPassword;
        }
        return repository.save(user);
    }

    @Override
    public void changePassword(User user, String newPassword) {
        user.hashPassword = bCryptPasswordEncoder.encode(newPassword);
        save(user);
    }

    @Override
    public boolean isEmailExist(String email) {
        return Objects.nonNull(getUserByEmail(email.toLowerCase()));
    }

    @Override
    public boolean isNameExist(String name) {
        return Objects.nonNull(getUserByUsername(name));
    }

    @Override
    public User getUserByEmail(String email) {
        return ((UserRepository) repository).findByEmail(email.toLowerCase());
    }

    @Override
    public Set<User> findAllUsersByIds(Set<Long> userIds) {
        return repository.findAll(userIds)
                .stream()
                .collect(Collectors.toSet());
    }

    @Override
    public User getUserByUsername(String name) {
        return ((UserRepository) repository).findByName(name);
    }

    private boolean isNewUser(User user) {
        return Objects.isNull(user.getId()) || user.getId() == 0;
    }

    private boolean needToFetchHashPassword(User user) {
        return !isNewUser(user)
                && (Objects.isNull(user.hashPassword) || user.hashPassword.equalsIgnoreCase(""));
    }
}