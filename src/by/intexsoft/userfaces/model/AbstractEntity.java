package by.intexsoft.userfaces.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.AbstractPersistable;

/**
 * @author JenkaBY
 *
 */
@MappedSuperclass
public class AbstractEntity extends AbstractPersistable<Integer> {

	private static final long serialVersionUID = -140584652196083093L;

	@Column(columnDefinition = "boolean default false", nullable = false)
	public boolean deleted;
	
	@Column(name = "created_at", nullable = true)
	@CreationTimestamp
	public Timestamp createdAt;
}
