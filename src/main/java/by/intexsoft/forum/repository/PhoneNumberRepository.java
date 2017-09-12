package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.PhoneNumber;
import by.intexsoft.forum.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface PhoneNumberRepository extends JpaRepository<PhoneNumber, Integer>{
	List<User> getAllByUser(User user);
}