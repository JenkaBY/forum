package by.intexsoft.forum.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.sql.Timestamp;

@MappedSuperclass
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "new"})
public class AbstractEntity extends AbstractPersistable<Long> {

	private static final long serialVersionUID = -140584652196083093L;

	@Column(columnDefinition = "boolean default false", nullable = false, insertable = false)
	public boolean deleted;
	
	@Column(name = "created_at", updatable = false)
	@CreationTimestamp
	public Timestamp createdAt;

	public void setId(long id) {
		super.setId(id);
	}
}
