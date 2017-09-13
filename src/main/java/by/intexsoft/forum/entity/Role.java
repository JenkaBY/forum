package by.intexsoft.forum.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "roles")
public class Role extends AbstractEntity {

    @Column(unique = true, length = 10, nullable = false)
    public String title;
}