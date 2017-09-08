package by.intexsoft.userfaces.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import by.intexsoft.userfaces.model.PhoneType;

@Transactional
public interface PhoneTypeRepository extends JpaRepository<PhoneType, Integer> {

}
