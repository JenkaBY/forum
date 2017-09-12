package by.intexsoft.forum.repository;

import by.intexsoft.forum.entity.PhoneType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface PhoneTypeRepository extends JpaRepository<PhoneType, Integer> {

}
