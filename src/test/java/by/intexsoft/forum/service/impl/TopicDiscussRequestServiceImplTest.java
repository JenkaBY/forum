package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.helper.Status;
import by.intexsoft.forum.repository.TopicDiscussRequestRepository;
import by.intexsoft.forum.service.StatusService;
import by.intexsoft.forum.service.TopicService;
import by.intexsoft.forum.service.UserService;
import by.intexsoft.forum.service.impl.helper.TestHelper;
import by.intexsoft.forum.service.impl.helper.TopicDiscussRequestServiceTestHelper;
import by.intexsoft.forum.service.impl.helper.status.StatusServiceTestHelper;
import by.intexsoft.forum.service.impl.helper.status.StatusTestHelper;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static by.intexsoft.forum.service.impl.helper.status.StatusTestHelper.PENDING;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class TopicDiscussRequestServiceImplTest {
    private TestHelper helper;
    private TopicDiscussRequestServiceTestHelper topicDiscussRequestServiceTestHelper;
    private StatusServiceTestHelper statusServiceTestHelper;

    @Mock
    private TopicService mockTopicService;
    @Mock
    private UserService mockUserService;
    @Mock
    private TopicDiscussRequestRepository mockTopicDiscussRequestRepository;
    @Mock
    private StatusService mockStatusService;

    @InjectMocks
    private TopicDiscussRequestServiceImpl topicDiscussRequestService;

    @Before
    public void setUp() throws Exception {
        helper = new TestHelper();
        statusServiceTestHelper = new StatusServiceTestHelper();
        topicDiscussRequestServiceTestHelper = new TopicDiscussRequestServiceTestHelper();
    }

    @After
    public void tearDown() throws Exception {
        topicDiscussRequestServiceTestHelper = null;
        statusServiceTestHelper = null;
        helper = null;
    }

    //    @Override
    //    public Page<TopicDiscussRequest> findAllPending(Pageable pageable) {
    //        return ((TopicDiscussRequestRepository) repository).findByStatus(
    //                this.statusService.findByTitle(Status.PENDING.name()),
    //                pageable);
    //    }
    @Test
    public void findAllPending() throws Exception {
        when(mockStatusService.findByTitle(Status.PENDING.name())).thenReturn(StatusTestHelper.PENDING);
        when(mockTopicDiscussRequestRepository.findByStatus(StatusTestHelper.PENDING, helper.getPageable()))
                .thenReturn(topicDiscussRequestServiceTestHelper.findByStatus(PENDING));

    }

    @Test
    public void getByTopicIdAndUserId() throws Exception {
    }

    @Test
    public void findAllByUser() throws Exception {
    }

    @Test
    public void save() throws Exception {
    }

    @Test
    public void delete() throws Exception {
    }

    private void setupMockedStatuses() {
        when(mockStatusService.findByTitle(Status.APPROVED.name())).thenReturn(new by.intexsoft.forum.entity.Status());
    }
}