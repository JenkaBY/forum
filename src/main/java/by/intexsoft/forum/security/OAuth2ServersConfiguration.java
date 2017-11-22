package by.intexsoft.forum.security;

import by.intexsoft.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.approval.ApprovalStore;
import org.springframework.security.oauth2.provider.approval.TokenApprovalStore;
import org.springframework.security.oauth2.provider.approval.TokenStoreUserApprovalHandler;
import org.springframework.security.oauth2.provider.approval.UserApprovalHandler;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.security.oauth2.provider.request.DefaultOAuth2RequestFactory;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import static org.springframework.http.HttpMethod.*;

/**
 * Этот класс служит для объединения двух классов конфигурации...из за того что TokenStore должен
 * быть расшарен между этими классами либо стоит использовать другую реалищацию TokenStore (JdbcTokenStore)
 * либо исправлять текущую ситуацию
 */
@Configuration
public class OAuth2ServersConfiguration {

    private static InMemoryTokenStore tokenStore = new InMemoryTokenStore();

    private ClientDetailsService clientDetailsService;

    public OAuth2ServersConfiguration(ClientDetailsService clientDetailsService) {
        this.clientDetailsService = clientDetailsService;
    }

    @Bean
    public TokenStoreUserApprovalHandler userApprovalHandler() {
        TokenStoreUserApprovalHandler handler = new TokenStoreUserApprovalHandler();
        handler.setTokenStore(tokenStore);
        handler.setRequestFactory(new DefaultOAuth2RequestFactory(clientDetailsService));
        handler.setClientDetailsService(clientDetailsService);
        return handler;
    }

    @Bean
    public ApprovalStore approvalStore() throws Exception {
        TokenApprovalStore store = new TokenApprovalStore();
        store.setTokenStore(tokenStore);
        return store;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder;
    }

    @Configuration
    @EnableResourceServer
    public static class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

        private static final String RESOURCE_ID = "oauth2_api";

        private LogoutSuccessHandler logoutSuccessHandler;

        @Autowired
        public ResourceServerConfiguration(@Qualifier("restLogoutSuccessHandler") LogoutSuccessHandler logoutSuccessHandler) {
            this.logoutSuccessHandler = logoutSuccessHandler;
        }

        @Override
        public void configure(ResourceServerSecurityConfigurer resources) {
            resources.resourceId(RESOURCE_ID).stateless(false);
        }

        @Override
        public void configure(HttpSecurity http) throws Exception {
            http
                    .authorizeRequests()
                    .antMatchers(GET, "/api/topic/*/all").permitAll() // GET messages in topic
                    .antMatchers(GET, "/api/topic/all").permitAll() // GET all topics
                    .antMatchers(GET, "/api/role/all").permitAll() // GET all roles
                    .antMatchers(GET, "/api/message/**").permitAll() // GET all topics

                    .antMatchers("/api/message/**").access("hasAnyRole('ROLE_MANAGER', 'ROLE_USER')") // POST, DELETE, PUT messages
                    .antMatchers(GET, "/api/topic/user").access("hasRole('ROLE_USER')") //GET user's topic
                    .antMatchers(GET, "/api/topic/*").permitAll() //GET topic
                    .antMatchers("/api/topic/*/discuss_request/**").access("hasRole('ROLE_USER')") //POST, GET topic discuss request
                    .antMatchers(GET, "/api/topic/discuss_request/my").access("hasRole('ROLE_USER')") //POST new topic discuss request
                    .antMatchers("/api/topic/discuss_request/**").access("hasAnyRole('ROLE_USER', 'ROLE_MANAGER')") //POST new topic discuss request

                    .antMatchers(GET, "/api/topic/request/all").access("hasRole('ROLE_MANAGER')")
                    .antMatchers(GET, "/api/topic/request/pending").access("hasRole('ROLE_MANAGER')")
                    .antMatchers(PUT, "/api/topic/request/**").access("hasAnyRole('ROLE_USER', 'ROLE_MANAGER')")
                    .antMatchers("/api/topic/request/**").access("hasRole('ROLE_USER')") //GET, POST new create or get my topic request
                    .antMatchers(POST, "/api/topic/request/new").access("hasRole('ROLE_USER')") //POST new topic discuss request

                    .antMatchers(GET, "/api/user").access("hasRole('ROLE_MANAGER')")
                    .antMatchers(PUT, "/api/user/**").authenticated() //UPDATE user's data, change password
                    .antMatchers(DELETE, "/api/user/**").access("hasRole('ROLE_ADMIN')") //UPDATE user's data, change password
                    .antMatchers("/api/user/**").permitAll()

                    .antMatchers("/api/admin/**").access("hasRole('ROLE_ADMIN')") // GET users
                    .antMatchers("/upload/user_image").authenticated()
                    .antMatchers("/asset/**").permitAll()
                    .antMatchers("/**").permitAll()
                    .and()
                    .logout()
                    .logoutUrl("/api/logout/")
                    .logoutSuccessUrl("/")
                    .logoutSuccessHandler(this.logoutSuccessHandler)
                    .permitAll()
                    .and()
                    .exceptionHandling()
                    .accessDeniedHandler(new OAuth2AccessDeniedHandler());
        }
    }

    @Configuration
    @EnableAuthorizationServer
    public static class AuthorizationServerConfiguration extends AuthorizationServerConfigurerAdapter {
        private static String REALM = "FORUM_REALM";
        private UserApprovalHandler userApprovalHandler;
        private AuthenticationManager authenticationManager;
        private UserService userService;

        @Autowired
        public AuthorizationServerConfiguration(UserService userService,
                                                @Qualifier("authenticationManagerBean") AuthenticationManager authenticationManager,
                                                UserApprovalHandler userApprovalHandler) {
            this.userService = userService;
            this.userApprovalHandler = userApprovalHandler;
            this.authenticationManager = authenticationManager;
        }

        @Override
        public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
            clients
                    .inMemory()
                    .withClient("forum-web")
                    .authorizedGrantTypes("password", "authorization_code", "refresh_token", "implicit")
                    .authorities("ROLE_CLIENT", "ROLE_TRUSTED_CLIENT")
                    .scopes("read", "write", "trust")
                    .secret("secret")
                    .accessTokenValiditySeconds(60000)
                    .refreshTokenValiditySeconds(60000);
        }

        @Override
        public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
            endpoints.tokenStore(tokenStore)
                    .prefix("/api")
                    .userApprovalHandler(userApprovalHandler)
                    .authenticationManager(authenticationManager)
                    .tokenEnhancer(tokenEnhancer());
        }

        @Override
        public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
            security.realm(REALM + "/client");
        }

//        See the link
// https://stackoverflow.com/questions/28492116/can-i-include-user-information-while-issuing-an-access-token
//        @Bean
//        @Primary
//        public AuthorizationServerTokenServices tokenServices() {
//            DefaultTokenServices tokenServices = new DefaultTokenServices();
//            tokenServices.setTokenEnhancer(tokenEnhancer());
//            return tokenServices;
//        }

        private TokenEnhancer tokenEnhancer() {
            return new CustomTokenEnhancer(userService);
        }
    }
}