/**
 * 
 */
package by.intexsoft.userfaces.model;

import static javax.persistence.FetchType.LAZY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * @author JenkaBY
 *
 */
@Entity
@Table(name = "phone_number")
public class PhoneNumber extends AbstractEntity{
	private static final long serialVersionUID = -8986163028800488367L;

	@Column(length = 15, nullable = false)
	public String number;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "user_id")
	public User user;
	
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "phone_type_id", nullable = false)
	public PhoneType type;

}
