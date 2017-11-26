package by.intexsoft.forum.dto;

/**
 * Contains string with path to image or other file for transfer to frontend.
 */
public class FileLinkDTO {
    public String imagePath;

    /**
     * For Jakson
     */
    public FileLinkDTO() {
    }

    /**
     * Creates new object
     *
     * @param imagePath path to file
     */
    public FileLinkDTO(String imagePath) {
        this.imagePath = imagePath;
    }
}
