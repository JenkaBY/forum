package by.intexsoft.forum.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.HttpStatus.OK;

@Component("restLogoutSuccessHandler")
public class RestLogoutSuccessHandler implements LogoutSuccessHandler {
    private final HttpStatus httpStatusToReturn;

    /**
     * Initialize the {@code HttpStatusLogoutSuccessHandler} with a user-defined
     * {@link HttpStatus}.
     *
     * @param httpStatusToReturn Must not be {@code null}.
     */
    public RestLogoutSuccessHandler(HttpStatus httpStatusToReturn) {
        Assert.notNull(httpStatusToReturn, "The provided HttpStatus must not be null.");
        this.httpStatusToReturn = httpStatusToReturn;
    }

    /**
     * Initialize the {@code HttpStatusLogoutSuccessHandler} with the default
     * {@link HttpStatus#OK}.
     */
    public RestLogoutSuccessHandler() {
        this.httpStatusToReturn = OK;
    }

    /**
     * Implementation of
     * {@link LogoutSuccessHandler#onLogoutSuccess(HttpServletRequest, HttpServletResponse, Authentication)}
     * . Sets the status on the {@link HttpServletResponse}.
     */
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response,
                                Authentication authentication) throws IOException, ServletException {
        response.setStatus(httpStatusToReturn.value());
        response.getWriter().flush();
    }
}
