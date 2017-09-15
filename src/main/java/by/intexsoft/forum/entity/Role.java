package by.intexsoft.forum.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "roles")
public class Role extends AbstractEntity implements Serializable{
    private static final long serialVersionUID = -8986163028800488368L;

    @Column(unique = true, length = 10, nullable = false)
    public String title;
}