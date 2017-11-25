package by.intexsoft.forum.dto;

/**
 * Describes the Exception occurred during working application. Allows Jakson mapper convert exceptions to JSON to able
 * represent in frontend
 */
public class ApiErrorResponseDTO {
    public String errorMessage;
    public String message;
    public StackTraceElement[] stackTraceElements;
    public String url;
    public int statusCode = 400;

    public ApiErrorResponseDTO() {
    }

    public ApiErrorResponseDTO(String errorMessage, StackTraceElement[] stackTraceElements) {
        this.errorMessage = errorMessage;
        this.stackTraceElements = stackTraceElements;
    }

    public ApiErrorResponseDTO(String errorMessage, StackTraceElement[] stackTraceElements,
                               String requestUrl, int httpStatusCode, String message) {
        this.errorMessage = errorMessage;
        this.stackTraceElements = stackTraceElements;
        this.url = requestUrl;
        this.message = message;
        statusCode = httpStatusCode;
    }
}
