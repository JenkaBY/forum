package by.intexsoft.userfaces.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * User class describes the 'user' table in DB.
 */
@Entity
@Table(name = "\"user\"")
public class User extends AbstractEntity{

	private static final long serialVersionUID = 2114056750097110098L;

	@Column(name = "first_name", nullable = false, length = 128)
	public String firstName;

	@Column(name = "last_name", nullable = false, length = 255)
	public String lastName;

	@Column(unique = true, nullable = false)
	public String email;

	@Column(name = "hash_password", nullable = false, length = 30)
	public String hashPassword;

	@Column(name = "last_logon_at")
	public Timestamp lastLogonAt;

	@Column(columnDefinition = "boolean default false", nullable = false)
	public boolean blocked;

	@Column(columnDefinition = "boolean default false", nullable = false)
	public boolean admin;

}
