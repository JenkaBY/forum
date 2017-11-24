package by.intexsoft.forum.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "new"})
public abstract class AbstractSystemEntity extends AbstractPersistable<Long> {
    private static final long serialVersionUID = -140584652196083091L;

    public void setId(long id) {
        super.setId(id);
    }
}
