package by.intexsoft.userfaces.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author JenkaBY
 *
 */
@Entity
@Table(name = "phone_type")
public class PhoneType extends AbstractEntity{
	private static final long serialVersionUID = -6678453838139726740L;

	@Column(nullable = false, unique = true, length = 20)
	public String title;
}
