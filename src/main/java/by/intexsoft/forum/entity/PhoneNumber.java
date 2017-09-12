package by.intexsoft.forum.entity;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

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
