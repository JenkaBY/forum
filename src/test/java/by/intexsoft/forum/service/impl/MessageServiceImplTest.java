package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Message;
import by.intexsoft.forum.entity.Topic;
import by.intexsoft.forum.entity.User;
import by.intexsoft.forum.repository.MessageRepository;
import by.intexsoft.forum.service.TopicService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;
import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class MessageServiceImplTest {
    @InjectMocks
    private MessageServiceImpl messageService;

    @Mock
    private MessageRepository mockMsgRepository;

    @Mock
    private TopicService mockTopicService;

    private long uniqueId;
    private TestHelper helper;
    private List<Message> messages;
    private List<Topic> topics;

    @Before
    public void setUp() throws Exception {
        helper = new TestHelper();
        topics = getTopics();
        generateMessages();
    }

    @After
    public void tearDown() throws Exception {
        helper = null;
        topics = null;
        messages = null;
    }

    @Test
    public void findAllByTopic() throws Exception {
        long topicId = 1L;
        when(mockTopicService.find(topicId)).thenReturn(findTopicById(topicId));
        Topic topic = findTopicById(topicId);
        when(mockMsgRepository.findByInTopicOrderByCreatedAt(topic, helper.getPageable())).thenReturn(messagesInTopic(topic));

        Page<Message> foundMessages = messageService.findAllByTopic(topic.getId(), helper.getPageable());

        assertEquals("Size should be 3", 3, foundMessages.getNumberOfElements());

        assertTrue("CreatedAt field of first message should be less that second message",
                foundMessages.getContent().get(0).createdAt.before(foundMessages.getContent().get(1).createdAt));
        assertTrue("CreatedAt field of second message should be less that third message",
                foundMessages.getContent().get(1).createdAt.before(foundMessages.getContent().get(2).createdAt));

        assertEquals(foundMessages.getContent().stream()
                        .filter(msg -> !msg.inTopic.equals(topic))
                        .count(),
                0);
    }

    @Test
    public void save() throws Exception {
        long topicId = 1L;
        Topic topic = findTopicById(topicId);
        User user = topic.createdBy;

        Message newMsg = buildMessage(null, topic, "Test first", user, new Timestamp(new Date().getTime()), null, null, 0);
        newMsg.setId(0);

        Message mockedMsg = cloneMessage(newMsg);
        mockedMsg.setId(+uniqueId);
        when(mockMsgRepository.save(newMsg)).thenReturn(mockedMsg);

        Message savedMsg = messageService.save(newMsg);
        assertNotNull(savedMsg.getId());

        final String updatedText = "updated";
        Message msgToUpdate = cloneMessage(newMsg);
        msgToUpdate.text = updatedText;

        mockedMsg.text = updatedText;
        mockedMsg.version++;
        mockedMsg.updatedAt = new Timestamp(new Date().getTime());
        mockedMsg.updatedBy = user;

        when(messageService.save(msgToUpdate)).thenReturn(mockedMsg);
        Message updatedMsg = messageService.save(msgToUpdate);
        assertNotNull(updatedMsg);
        assertEquals(updatedMsg.text, updatedText);
        assertNotNull(updatedMsg.updatedAt);
        assertNotEquals(updatedMsg.version, msgToUpdate.version);
    }

    private void generateMessages() {
        Topic firstTopic = topics.get(0);
        User firstUser = firstTopic.createdBy;
        Topic secondTopic = topics.get(1);
        User secondUser = secondTopic.createdBy;

        messages = new ArrayList<>(Arrays.asList(
                buildMessage(null, firstTopic, "Test first", firstUser, new Timestamp(new Date().getTime() - 100), null, null, 0),
                buildMessage(null, firstTopic, "Test second", firstUser, new Timestamp(new Date().getTime() + 200), null, null, 0),
                buildMessage(null, secondTopic, "Test second msg of second user", secondUser, new Timestamp(new Date().getTime() - 150), null, null, 0),
                buildMessage(null, firstTopic, "Test third msg of first user", firstUser, new Timestamp(new Date().getTime() - 200), null, null, 0)
        ));
    }

    private Message buildMessage(Long id, Topic inTopic, String text, User createdBy, Timestamp createdAt, User updatedBy,
                                 Timestamp updatedAt, long version) {
        Message message = new Message();
        message.setId(Objects.isNull(id) ? ++uniqueId : id);
        message.text = text;
        message.createdAt = createdAt;
        message.updatedAt = updatedAt;
        message.inTopic = inTopic;
        message.version = version;
        message.createdBy = createdBy;
        message.updatedBy = updatedBy;
        return message;
    }

    private Topic createTopic(Long id, String title, String description, User createdBy, Timestamp createdAt, long version) {
        Topic topic = new Topic();
        topic.setId(Objects.isNull(id) ? ++uniqueId : id);
        topic.createdAt = createdAt;
        topic.createdBy = createdBy;
        topic.version = version;
        topic.description = description;
        topic.title = title;
        return topic;
    }

    private List<Topic> getTopics() {
        User user1 = helper.createUser(1L);
        return new ArrayList<>(Arrays.asList(
                createTopic(1L, "First topic", "Description", user1, new Timestamp(new Date().getTime()), 0),
                createTopic(2L, "Second topic", "Description", user1, new Timestamp(new Date().getTime()), 0)
        ));
    }

    private Topic findTopicById(long topicId) throws Exception {
        return topics.stream()
                .filter(topic -> topic.getId().equals(topicId))
                .findFirst()
                .orElse(null);
    }

    private List<Message> getSortedMessagesInTopic(Topic topic) {
        return messages.stream()
                .filter(msg -> msg.inTopic.equals(topic))
                .limit(helper.getPageSize())
                .collect(Collectors.toList());
    }

    private Page<Message> messagesInTopic(Topic topic) {
        List<Message> filteredAndSorted = messages.stream()
                .filter(msg -> msg.inTopic.equals(topic))
                .sorted(Comparator.comparing(msg -> msg.createdAt))
                .collect(toList());
        return new PageImpl<>(
                filteredAndSorted,
                helper.getPageable(),
                filteredAndSorted.size());
    }

    private Message cloneMessage(Message message) {
        Message clone = new Message();
        clone.inTopic = message.inTopic;
        clone.createdAt = new Timestamp(message.createdAt.getTime());
        clone.createdBy = Objects.nonNull(message.createdBy) ? helper.cloneUser(message.createdBy) : null;
        clone.version = message.version;
        clone.updatedBy = Objects.nonNull(message.updatedBy) ? helper.cloneUser(message.updatedBy) : null;
        clone.updatedAt = Objects.nonNull(message.updatedAt) ? new Timestamp(message.updatedAt.getTime()) : null;
        clone.text = message.text;
        clone.deleted = message.deleted;
        clone.setId(message.getId());
        return clone;
    }
}