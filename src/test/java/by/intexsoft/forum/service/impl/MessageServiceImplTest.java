package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.repository.MessageRepository;
import by.intexsoft.forum.service.TopicService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class MessageServiceImplTest {
    @InjectMocks
    private MessageServiceImpl messageService;

    @Mock
    private MessageRepository mockMsgRepository;

    @Mock
    private TopicService mockTopicService;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void findAllByTopic() throws Exception {
    }

    @Test
    public void save() throws Exception {
    }
}