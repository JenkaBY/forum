package by.intexsoft.forum.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Role class describes the 'roles' table in DB.
 */
@Entity
@Table(name = "roles")
public class Role extends AbstractSystemEntity {
    private static final long serialVersionUID = -8986163028800488368L;

    @Column(unique = true, length = 10, nullable = false)
    public String title;
}