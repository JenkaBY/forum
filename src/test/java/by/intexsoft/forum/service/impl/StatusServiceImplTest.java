package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Status;
import by.intexsoft.forum.repository.StatusRepository;
import by.intexsoft.forum.service.impl.helper.status.StatusServiceTestHelper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.List;

import static by.intexsoft.forum.service.impl.helper.status.StatusTestHelper.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.doReturn;

@RunWith(MockitoJUnitRunner.class)
public class StatusServiceImplTest {
    @InjectMocks
    private StatusServiceImpl statusService;
    @Mock
    private StatusRepository mockStatusRepository;

    private StatusServiceTestHelper statusServiceTestHelper = new StatusServiceTestHelper();

    @Test
    public void findByTitle() throws Exception {
        doReturn(statusServiceTestHelper.findByTitle("APPROVED")).when(mockStatusRepository).findByTitle("APPROVED");

        Status status = statusService.findByTitle("APPROVED");

        assertNotNull(status);
        assertEquals(APPROVED, status);
    }

    @Test
    public void find() throws Exception {
        doReturn(statusServiceTestHelper.findById(PENDING.getId())).when(mockStatusRepository).findOne(PENDING.getId());

        Status status = statusService.find(PENDING.getId());

        assertNotNull(status);
    }

    @Test
    public void findAll() throws Exception {
        doReturn(statusServiceTestHelper.getStatuses()).when(mockStatusRepository).findAll();

        List<Status> statusesFromDb = statusService.findAll();

        assertNotNull(statusesFromDb);
        assertEquals(statusesFromDb.size(), statusServiceTestHelper.getStatuses().size());
        assertTrue(statusesFromDb.contains(REJECTED));
    }
}