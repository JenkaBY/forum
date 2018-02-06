package by.intexsoft.forum.service.impl.helper.status;

import by.intexsoft.forum.entity.Status;

import java.util.Arrays;
import java.util.List;

import static by.intexsoft.forum.service.impl.helper.status.StatusTestHelper.*;

public class StatusServiceTestHelper {
    private List<Status> statuses = Arrays.asList(APPROVED, PENDING, REJECTED);

    public List<Status> getStatuses() {
        return statuses;
    }

    public Status findById(long id) {
        return statuses.stream().filter(status -> status.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Status findByTitle(String title) {
        return statuses.stream().filter(status -> status.title.equals(title))
                .findFirst()
                .orElse(null);
    }
}
