package by.intexsoft.forum.controller.handlers;

import by.intexsoft.forum.dto.ApiErrorResponseDTO;
import ch.qos.logback.classic.Logger;
import org.hibernate.StaleObjectStateException;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

/**
 * Exception handler for exceptions occurred while application works
 */
@RestControllerAdvice
public class RestResponseEntityExceptionHandler {
    private static Logger LOGGER = (Logger) LoggerFactory.getLogger(RestResponseEntityExceptionHandler.class);
    private final ReloadableResourceBundleMessageSource messageSource;

    @Autowired
    public RestResponseEntityExceptionHandler(ReloadableResourceBundleMessageSource messageSource) {
        this.messageSource = messageSource;
    }


    /**
     * Handles the StaleObjectStateException (optimistic lock exception). Sets  the {@link HttpStatus#CONFLICT} to response
     *
     * @param request request from frontend
     * @param ex      exception to be handled
     * @return {@link ApiErrorResponseDTO} object that exception info and localized message about error that will be shown in UI
     */
    @ExceptionHandler({StaleObjectStateException.class})
    @ResponseStatus(HttpStatus.CONFLICT)
    protected ApiErrorResponseDTO handleOptimisticLockException(HttpServletRequest request, Exception ex) {
        LOGGER.warn(ex.getMessage());
        return
                new ApiErrorResponseDTO(ex.getMessage(),
                        ex.getStackTrace(),
                        request.getRequestURI(),
                        HttpStatus.CONFLICT.value(),
                        messageSource.getMessage("optimistic.lock.error", null, request.getLocale()));
    }

//    @ExceptionHandler({Exception.class})
//    protected ResponseEntity<?> handleGlobalException(RuntimeException ex, WebRequest request) {
//        System.out.println(ex.getMessage());
//        return handleExceptionInternal(ex,
//                new ApiErrorResponseDTO(ex.getMessage(),
//                        ex.getStackTrace(),
//                        request.getDescription(false),
//                        request.getHeader("Status Code")),
//                new HttpHeaders(),
//                HttpStatus.BAD_REQUEST,
//                request);
//    }
}

