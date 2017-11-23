package by.intexsoft.forum.dto;

/**
 * Describes the Exception occurred during working application. Allows Jakson mapper convert exceptions to JSON to able
 * represent in frontend
 */
public class ExceptionInfoDTO {
    public String errorMessage;
    public StackTraceElement[] stackTraceElements;

    public ExceptionInfoDTO() {
    }

    public ExceptionInfoDTO(String errorMessage, StackTraceElement[] stackTraceElements) {
        this.errorMessage = errorMessage;
        this.stackTraceElements = stackTraceElements;
    }
}
