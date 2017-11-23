package by.intexsoft.forum.controller.handlers;

import by.intexsoft.forum.dto.ExceptionInfoDTO;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Exception handler for all exceptions occurred while application work
 */
@RestControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {Exception.class})
    protected ResponseEntity<?> handleConflict(RuntimeException ex, WebRequest request) {
        System.out.println(ex.getMessage());
        return handleExceptionInternal(ex,
                new ExceptionInfoDTO(ex.getMessage(), ex.getStackTrace()),
                new HttpHeaders(),
                HttpStatus.CONFLICT,
                request);
    }
}

