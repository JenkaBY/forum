package by.intexsoft.forum.controller.handlers;

import by.intexsoft.forum.dto.ApiErrorResponseDTO;
import org.hibernate.StaleObjectStateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

/**
 * Exception handler for all exceptions occurred while application work
 */
@RestControllerAdvice
public class RestResponseEntityExceptionHandler {
    @Autowired
    private ReloadableResourceBundleMessageSource messageSource;

    @ExceptionHandler({StaleObjectStateException.class})
    @ResponseStatus(HttpStatus.CONFLICT)
    protected ApiErrorResponseDTO handleOptimisticLockException(HttpServletRequest request, Exception ex) {
        System.out.println(ex.getMessage());
        System.out.println(request.getLocale());
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

