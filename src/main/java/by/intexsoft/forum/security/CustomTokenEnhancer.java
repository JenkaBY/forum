package by.intexsoft.forum.security;

import by.intexsoft.forum.dto.UserDTO;
import by.intexsoft.forum.service.UserService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


public class CustomTokenEnhancer implements TokenEnhancer {

    private UserService userService;

    public CustomTokenEnhancer(UserService userService) {
        this.userService = userService;
    }

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        by.intexsoft.forum.entity.User authenticatedUser = userService.getUserByEmail(user.getUsername());
        final Map<String, Object> additionalInfo = new HashMap<>();

        authenticatedUser.lastLogonAt = new Timestamp(new Date().getTime());
        authenticatedUser = userService.save(authenticatedUser);
        
        additionalInfo.put("user", new UserDTO(authenticatedUser));

        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInfo);


        return accessToken;
    }
}
