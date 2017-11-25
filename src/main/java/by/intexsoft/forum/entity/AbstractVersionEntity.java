package by.intexsoft.forum.entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;
import java.sql.Timestamp;

@MappedSuperclass
public abstract class AbstractVersionEntity extends AbstractSystemEntity {
    private static final long serialVersionUID = -140584652196083093L;

	@Column(columnDefinition = "boolean default false", nullable = false, insertable = false)
	public boolean deleted;
	
	@Column(name = "created_at", updatable = false)
	@CreationTimestamp
	public Timestamp createdAt;

    @Version
    @Column(columnDefinition = "default 0", nullable = false)
    public long version;

	public void setId(long id) {
		super.setId(id);
	}
}
