package by.intexsoft.forum.service.impl.helper.status;

import by.intexsoft.forum.entity.Status;

public class StatusTestHelper {
    public static final Status PENDING;
    public static final Status APPROVED;
    public static final Status REJECTED;

    static {
        PENDING = new Status();
        PENDING.title = "PENDING";
        PENDING.setId(1);

        APPROVED = new Status();
        APPROVED.title = "APPROVED";
        APPROVED.setId(2);

        REJECTED = new Status();
        REJECTED.title = "REJECTED";
        REJECTED.setId(3);
    }
}