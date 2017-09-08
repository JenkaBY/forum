package by.intexsoft.userfaces.model;

import static javax.persistence.FetchType.LAZY;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * @author JenkaBY
 *
 */
@Entity
@Table(name = "community")
public class Community extends AbstractEntity{

	private static final long serialVersionUID = 4449760913458437105L;

	@Column(length = 255, nullable = false)
	public String title;

	@ManyToMany(fetch = LAZY)
	@JoinTable(name = "community_admin",
	  joinColumns = @JoinColumn(name = "community_id"),
	  inverseJoinColumns = @JoinColumn(name = "admin_id"))
	public Set<User> admins;
	
	@OneToOne(fetch = LAZY)
	public User owner;
	
	@Column(columnDefinition = "boolean default false", nullable = false)
	public boolean closed;
	
}
