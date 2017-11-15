package by.intexsoft.forum.dto;

public class ChangePassword {
    public String currentPassword;
    public String newPassword;

    public ChangePassword() {
    }

    public ChangePassword(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}
