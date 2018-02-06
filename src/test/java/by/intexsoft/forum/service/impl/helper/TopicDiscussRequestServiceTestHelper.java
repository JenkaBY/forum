package by.intexsoft.forum.service.impl.helper;


import by.intexsoft.forum.entity.Status;
import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.entity.TopicDiscussRequest;
import by.intexsoft.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static java.util.stream.Collectors.toList;

public class TopicDiscussRequestServiceTestHelper {
    private List<TopicDiscussRequest> topicDiscussRequests = Arrays.asList();
    private TestHelper helper = new TestHelper();

    public Page<TopicDiscussRequest> findByStatus(Status status) {
        return new PageImpl<>(
                topicDiscussRequests.stream()
                        .filter(topicDiscussRequest -> topicDiscussRequest.status.equals(status))
                        .collect(toList()),
                helper.getPageable(),
                helper.getPageSize());
    }

    public List<TopicDiscussRequest> getTopicDiscussRequests() {
        return topicDiscussRequests;
    }

    public TopicDiscussRequest createTopicDiscussRequest(Topic inTopic, Status status, User requestedBy, User approvedBy) {
        TopicDiscussRequest request = new TopicDiscussRequest();

        request.inTopic = inTopic;
        request.status = status;
        request.requestedBy = requestedBy;
        request.approvedBy = approvedBy;
        request.approvedAt = Objects.isNull(request.approvedBy) ? null : new Timestamp(new Date().getTime());

        return request;
    }

}
