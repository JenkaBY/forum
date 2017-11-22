package by.intexsoft.forum.dto;

/**
 * Describes exists a entity in DB or not
 */
public class EntityAware {
    public boolean found;

    public EntityAware() {
    }

    /**
     * Constructor for initialize instance
     *
     * @param found {@code boolean} found or not entity in DB
     */
    public EntityAware(boolean found) {
        this.found = found;
    }
}
