package by.intexsoft.forum.entity;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "topics")
public class Topic {

    @Column(unique = true, nullable = false)
    public String title;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "created_by")
    public long createBy;
}
