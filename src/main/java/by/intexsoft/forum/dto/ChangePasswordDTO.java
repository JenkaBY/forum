package by.intexsoft.forum.dto;

/**
 * Class describes current password and new password for changing user's password
 */
public class ChangePasswordDTO {
    public String currentPassword;
    public String newPassword;

    /**
     * For Jakson
     */
    public ChangePasswordDTO() {
    }

    /**
     * constructor for simple creating of instance
     *
     * @param currentPassword raw current password for checking
     * @param newPassword     raw new password
     */
    public ChangePasswordDTO(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}
