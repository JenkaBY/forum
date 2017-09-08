/**
 * 
 */
package by.intexsoft.userfaces.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import by.intexsoft.userfaces.model.PhoneNumber;
import by.intexsoft.userfaces.model.User;

@Transactional
public interface PhoneNumberRepository extends JpaRepository<PhoneNumber, Integer>{
	List<User> getAllByUser(User user);
}