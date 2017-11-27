package by.intexsoft.forum.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Describes 'statuses' table in DB
 */
@Entity
@Table(name = "statuses")
public class Status extends AbstractSystemEntity {
    private static final long serialVersionUID = -8986163028800488369L;

    @Column(unique = true, length = 10, nullable = false)
    public String title;
}
