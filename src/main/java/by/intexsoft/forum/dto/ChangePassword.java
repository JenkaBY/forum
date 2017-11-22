package by.intexsoft.forum.dto;

/**
 * Class describes current password and new password for changing user's password
 */
public class ChangePassword {
    public String currentPassword;
    public String newPassword;

    /**
     * For Jakson
     */
    public ChangePassword() {
    }

    /**
     * constructor for simple creating of instance
     *
     * @param currentPassword raw current password for checking
     * @param newPassword     raw new password
     */
    public ChangePassword(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}
