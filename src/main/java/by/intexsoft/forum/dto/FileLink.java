package by.intexsoft.forum.dto;

/**
 * Contains string with path to image or other file for transfer to frontend.
 */
public class FileLink {
    public String imagePath;

    /**
     * For Jakson
     */
    public FileLink() {
    }

    /**
     * Creates new object
     *
     * @param imagePath path to file
     */
    public FileLink(String imagePath) {
        this.imagePath = imagePath;
    }
}
