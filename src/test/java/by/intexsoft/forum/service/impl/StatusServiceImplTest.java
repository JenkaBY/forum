package by.intexsoft.forum.service.impl;

import by.intexsoft.forum.entity.Status;
import by.intexsoft.forum.repository.StatusRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;

import static by.intexsoft.forum.service.impl.TestHelper.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.doReturn;

@RunWith(MockitoJUnitRunner.class)
public class StatusServiceImplTest {
    @InjectMocks
    private StatusServiceImpl statusService;
    @Mock
    private StatusRepository mockStatusRepository;

    private List<Status> statuses = Arrays.asList(APPROVED, PENDING, REJECTED);

    @Test
    public void findByTitle() throws Exception {
        doReturn(findByTitle("APPROVED")).when(mockStatusRepository).findByTitle("APPROVED");
        Status status = statusService.findByTitle("APPROVED");
        assertNotNull(status);
        assertEquals(APPROVED, status);
    }

    @Test
    public void find() throws Exception {
        doReturn(findById(PENDING.getId())).when(mockStatusRepository).findOne(PENDING.getId());
        Status status = statusService.find(PENDING.getId());
        assertNotNull(status);
    }

    @Test
    public void findAll() throws Exception {
        doReturn(statuses).when(mockStatusRepository).findAll();
        List<Status> statusesFromDb = statusService.findAll();
        assertNotNull(statusesFromDb);
        assertEquals(statusesFromDb.size(), statuses.size());
        assertTrue(statusesFromDb.contains(REJECTED));
    }

    private Status findById(long id) {
        return statuses.stream().filter(status -> status.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    private Status findByTitle(String title) {
        return statuses.stream().filter(status -> status.title.equals(title))
                .findFirst()
                .orElse(null);
    }
}