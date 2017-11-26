package by.intexsoft.forum.dto;

/**
 * Describes exists a entity in DB or not
 */
public class EntityAwareDTO {
    public boolean found;

    public EntityAwareDTO() {
    }

    /**
     * Constructor for initialize instance
     *
     * @param found {@code boolean} found or not entity in DB
     */
    public EntityAwareDTO(boolean found) {
        this.found = found;
    }
}
