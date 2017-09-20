package by.intexsoft.forum.security;

import by.intexsoft.forum.constant.Validation;

public class SecurityHelper {
    public static boolean checkPasswordLength(String password) {
        return password.length() >= Validation.MIN_PASSWORD_LENGHT
                && password.length() <= Validation.MAX_PASSWORD_LENGTH;
    }
}

