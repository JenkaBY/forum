package by.intexsoft.forum.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.sql.Timestamp;

@MappedSuperclass
public class AbstractEntity extends AbstractPersistable<Long> {

	private static final long serialVersionUID = -140584652196083093L;

	@Column(columnDefinition = "boolean default false", nullable = false, insertable = false)
	public boolean deleted;
	
	@Column(name = "created_at", updatable = false)
	@CreationTimestamp
	public Timestamp createdAt;
}
